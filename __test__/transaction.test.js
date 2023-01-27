const request = require('supertest')
const express = require("express");
const app = require('../app')
const {sequelize} = require('../models')



const foodList = require('../data/data.json')
foodList.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
    el.additionalInfos = el.additionalInfos.join(", ")
})


beforeAll( async () => {
    try {
        await sequelize.queryInterface.bulkInsert('Food', foodList)
    } catch (err) {
        console.log(err)
    }
}) 


afterAll( async () => {
    try {
        await sequelize.queryInterface.bulkDelete('Food', null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
        })
    } catch(err) {
        console.log(err)
    }
}) 

describe('transaction routes', function() {
  describe('POST /transaction', function() {
    it(`should succesfully add transaction`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          tableId: 1,
          orders: [
            {
              "FoodId": 3,
              "name": "Triple Cheese",
              "price": 19.99,
              "quantity": 2
            },
            {
              "FoodId": 11,
              "name": "Aglio Olio",
              "price": 14.99,
              "quantity": 4
            },
          ]
        })
      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty("id", expect.any(Number))
      expect(response.body).toHaveProperty("tableId", expect.any(Number))
      expect(response.body).toHaveProperty("totalItems", expect.any(Number))
      expect(response.body).toHaveProperty("totalPrice", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("FoodId", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("name", expect.any(String))
      expect(response.body.orders[0]).toHaveProperty("price", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("quantity", expect.any(Number))
      
    });


    it(`should responds with error message: 'Table ID must be provided.' and status 400`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          orders: [
            {
              "FoodId": 3,
              "name": "Triple Cheese",
              "price": 19.99,
              "quantity": 2
            },
            {
              "FoodId": 11,
              "name": "Aglio Olio",
              "price": 14.99,
              "quantity": 4
            },
          ]
        })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Table ID must be provided.')
      })
    });

    it(`should responds with error message: 'Orders must be provided.' and status 400`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          tableId: 1
        })
        console.log(response.body)
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Orders must be provided.')
      })
    });

    it(`should responds with error message: 'Orders must be provided.' and status 400`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          tableId: 1,
          orders: []
        })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Orders must be provided.')
      })
    });

    it(`should responds with error message: 'Food ID must be provided.' and status 400`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          tableId: 1,
          orders: [
            {
              "FoodId": 3,
              "name": "Triple Cheese",
              "price": 19.99,
              "quantity": 2
            },
            {
              "name": "Aglio Olio",
              "price": 14.99,
              "quantity": 4
            },
          ]
        })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Food ID must be provided.')
      })
    });

    it(`should responds with error message: 'Total price must be in float format.' and status 400`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          tableId: 1,
          orders: [
            {
              "FoodId": 3,
              "name": "Triple Cheese",
              "quantity": 2
            },
            {
              "FoodId": 11,
              "name": "Aglio Olio",
              "price": 14.99,
              "quantity": 4
            },
          ]
        })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Total price must be in float format.')
      })
    });

    it(`should responds with error message: 'Total items must be an integer.' and status 400`, async function() {
      const response = await request(app)
        .post('/transaction')
        .send({
          tableId: 1,
          orders: [
            {
              "FoodId": 3,
              "name": "Triple Cheese",
              "price": 19.99,
              "quantity": 2
            },
            {
              "FoodId": 11,
              "name": "Aglio Olio",
              "price": 14.99,
            },
          ]
      })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Total items must be an integer.')
      })
    });
  });


  describe('GET /transaction', function() {
    it(`should return list of orders from specific transaction and table id`, async function() {
      const newTransactionResponse = await request(app)
        .post('/transaction')
        .send({
          tableId: 1,
          orders: [
            {
              "FoodId": 3,
              "name": "Triple Cheese",
              "price": 19.99,
              "quantity": 2
            },
            {
              "FoodId": 11,
              "name": "Aglio Olio",
              "price": 14.99,
              "quantity": 3
            },
          ]
      })

      const response = await request(app)
        .get('/transaction')
        .send({
          TransactionId: newTransactionResponse.body.id
        })
        console.log(response.body, "ini test") 
      expect(response.status).toEqual(200);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty("tableId", expect.any(Number))
      expect(response.body).toHaveProperty("totalItems", expect.any(Number))
      expect(response.body).toHaveProperty("totalPrice", expect.any(Number))   
      expect(response.body.orders[0]).toHaveProperty("FoodId", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("TransactionId", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("price", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("quantity", expect.any(Number))
      expect(response.body.orders[0]).toHaveProperty("Food", expect.objectContaining({
        name: expect.any(String),
        toppings: expect.any(String),
        price: expect.any(Number),
        picture: expect.any(String),
        additionalInfos: expect.any(String),
      }))
    });

    it(`should return message: 'Transaction ID must be provided.`, async function() {
      const response = await request(app)
        .get('/transaction')
        .send({
          tableId: 1,
        })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Transaction ID must be provided.')
      })
    });


  });


});