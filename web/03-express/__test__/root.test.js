const request = require("supertest");
const root = require('../root');
const express = require('express');
const app = express();

app.use('/', root);

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the POST method 201", done => {
    request(app)
        .post("/")
        .type("json")
        .send({item: 'hey'})
        .then(response => {
            // TODO: Why do not send request body?
            console.log(response.body);
            expect(response.status).toBe(201);
            done();
    });
  });

  test("It should response the POST method 400", done => {
    request(app)
        .post("/")
        .type("form")
        .send({item: 'hey'})
        .then(response => {
            // TODO: Why do not send request body?
            console.log(response.body);
            expect(response.status).toBe(400);
            done();
    });
  });
});

describe("Test the root path", () => {
  
});