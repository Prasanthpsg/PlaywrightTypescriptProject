import { expect, test } from '@playwright/test'

import { formatAPIRequest } from '../src/Utils/APIhelper'
import path from 'path'
import fs from 'fs'
import { faker, Faker } from '@faker-js/faker'



test('@API Create a booking id using dynamic request', async ({ request }) => {

    // Reading json file
    const postJsonPath = path.join(__dirname, '../src/API_requests/POST_request_booking.json');
    const postJsonTemplate = fs.readFileSync(postJsonPath, 'utf-8');

    const input = ["Hi", "Prasanth", 121, true, "UAE"];

    // Updating POST API request body
    const postAPIRequest = await formatAPIRequest(postJsonTemplate, input); 

    //post request
    const postResponse = await request.post(`${process.env.REST_FULL_BOOKER_BASEURL}/booking`,
        { data: JSON.parse(postAPIRequest) }
    );

    const postJSONResponse = await postResponse.json();
    console.log(`POST JSON response: ${JSON.stringify(postJSONResponse, null, 2)}`);

    //validation
    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe("OK");
    expect(postResponse.headers()['content-type']).toBe("application/json; charset=utf-8");

    //validate property name
    expect(postJSONResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(postJSONResponse.booking.bookingdates).toHaveProperty('checkout');

    //array destructuring
    const [fname, lname, price, deposit] = input;

    // Validate API response body
    // expect(postJSONResponse.booking.firstname).toEqual(input[0])
    // expect(postJSONResponse.booking.lastname).toEqual(input[1])
    // expect(postJSONResponse.booking.totalprice).toEqual(input[2])
    // expect(postJSONResponse.booking.depositpaid).toEqual(input[3])

    expect(postJSONResponse.booking.firstname).toEqual(fname)
    expect(postJSONResponse.booking.lastname).toEqual(lname)
    expect(postJSONResponse.booking.totalprice).toEqual(price)
    expect(postJSONResponse.booking.depositpaid).toEqual(deposit)

})

test.describe(() => {

    test.describe.configure({retries:2});

    test.only('@API Create a booking id using dynamic request - faker library', async ({ request }) => {

    // Reading json file
    const postJsonPath = path.join(__dirname, '../src/API_requests/POST_request_booking.json');
    const postJsonTemplate = fs.readFileSync(postJsonPath, 'utf-8');

    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakeprice = faker.number.int({ min: 2, max: 1000 });
    const fakeneed = "my need";

    const input = [fakeFirstName, fakeLastName, fakeprice, true, fakeneed];

    // Updating POST API request body
    const postAPIRequest = await formatAPIRequest(postJsonTemplate, input);

    //post request
    const postResponse = await request.post(`${process.env.REST_FULL_BOOKER_BASEURL}/booking`,
        { data: JSON.parse(postAPIRequest) }
    );

    const postJSONResponse = await postResponse.json();
    console.log(`POST JSON response: ${JSON.stringify(postJSONResponse, null, 2)}`);

    //validation
    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe("OK");
    expect(postResponse.headers()['content-type']).toBe("application/json; charset=utf-8");

    //validate property name
    expect(postJSONResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(postJSONResponse.booking.bookingdates).toHaveProperty('checkout');

    //array destructuring
    const [fname, lname, price, deposit, additionalneeds] = input;


    expect(postJSONResponse.booking.firstname).toEqual(fname)
    expect(postJSONResponse.booking.lastname).toEqual(lname)
    expect(postJSONResponse.booking.totalprice).toEqual(price)
    expect(postJSONResponse.booking.additionalneeds).toEqual(additionalneeds)

    //print booking id
    const bookingID = await postJSONResponse.bookingid;
    console.log(`My booking ID is ${bookingID}`)


    // GET end point
    const getAPIResponse = await request.get(`${process.env.REST_FULL_BOOKER_BASEURL}/booking/${bookingID}`)

    const getJSONResponse = await getAPIResponse.json();
    console.log(`GET response :${JSON.stringify(getJSONResponse, null, 2)}`)

     //validation
    expect(postResponse.status()).toBe(200);
    expect.soft(postResponse.statusText()).toBe("OK");
    expect(postResponse.headers()['content-type']).toBe("application/json; charset=utf-8");
})

})
