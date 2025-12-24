import { expect, test } from '@playwright/test'

import { formatAPIRequest } from '../src/Utils/APIhelper'
import path from 'path'
import fs from 'fs'
import { faker, Faker } from '@faker-js/faker'

test('@API Create , Update and delete booking id using dynamic request - faker library', async ({ request }) => {

    // Reading json file
    const postJsonPath = path.join(__dirname, '../src/API_requests/POST_request_booking.json');
    const postJsonTemplate = fs.readFileSync(postJsonPath, 'utf-8');

    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakeprice = faker.number.int({ min: 2, max: 1000 });
    //  const fakeneed = faker.string.sample({ min: 2, max: 10 });
    const fakeneed = "hii";

    const input = [fakeFirstName, fakeLastName, fakeprice, true, fakeneed];

    // Updating POST API request body
    const postAPIRequest = await formatAPIRequest(postJsonTemplate, input);
    let postJSONAPIRequest = JSON.parse(postAPIRequest);
    console.log('post request: ', postJSONAPIRequest);

    //post request
    const postResponse = await request.post(`${process.env.REST_FULL_BOOKER_BASEURL}/booking`,
        { data: JSON.parse(postAPIRequest) }
    );

    const postJSONResponse = await postResponse.json();
    console.log(`POST JSON response: ${JSON.stringify(postJSONResponse, null, 2)}`);

    //array destructuring
    const [fname, lname, price, deposit, additionalneeds] = input;


    expect(postJSONResponse.booking.firstname).toEqual(fname)
    expect(postJSONResponse.booking.lastname).toEqual(lname)
    expect(postJSONResponse.booking.totalprice).toEqual(price)
    expect(postJSONResponse.booking.additionalneeds).toEqual(additionalneeds)

    //print booking id
    const bookingID = await postJSONResponse.bookingid;
    console.log(`My booking ID is ${bookingID}`)
    console.log('----------------------------');


    //create a token
    // Reading json file
    const postTokenJsonPath = path.join(__dirname, '../src/API_requests/POST_Create_Token.json');
    const postTokenJsonTemplate = fs.readFileSync(postTokenJsonPath, 'utf-8');

    const tokeninput = [`${process.env.TOKENUSERNAME}`, `${process.env.TOKENPASSWORD}`];// read data from .env file
    const formattedTokenRequest = await formatAPIRequest(postTokenJsonTemplate, tokeninput);

    const tokenResponse = await request.post(`${process.env.REST_FULL_BOOKER_BASEURL}/auth`,
        {
            data: JSON.parse(formattedTokenRequest)
        }
    )

    const tokenJSONResponse = await tokenResponse.json();
    console.log(`Token response : ${JSON.stringify(tokenJSONResponse, null, 2)}`);
    console.log(`Token is : ${tokenJSONResponse.token}`);
    console.log('----------------------------');

    //Update the resource
    const putJSONAPIRequest = postJSONAPIRequest
    putJSONAPIRequest.firstname = "update";
    putJSONAPIRequest.lastname = "update last name";
    putJSONAPIRequest['totalprice'] = 1234

    console.log('put request: ', putJSONAPIRequest);
    const putResponse = await request.put(`${process.env.REST_FULL_BOOKER_BASEURL}/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenJSONResponse.token.trim()}`
        },
        data: putJSONAPIRequest

    })

    const putJSONAPIResponse = await putResponse.json();
    console.log(`PUT API json response: ${JSON.stringify(putJSONAPIResponse, null, 2)}`)

    //validation
    expect(putResponse.status()).toBe(200);
    expect(putResponse.statusText()).toBe("OK");
    expect(putResponse.headers()['content-type']).toBe("application/json; charset=utf-8");

    expect(putJSONAPIResponse.firstname).toEqual("update")
    expect(putJSONAPIResponse.lastname).toEqual("update last name")
    expect(putJSONAPIResponse.totalprice).toEqual(1234)
    console.log('----------------------------');

    //DELETE booking
    const deleteResponse = await request.delete(`${process.env.REST_FULL_BOOKER_BASEURL}/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${tokenJSONResponse.token.trim()}`
        }

    })

    console.log('Delete response : ', deleteResponse);

    //validation
    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.headers()['content-type']).toBe("text/plain; charset=utf-8");

})