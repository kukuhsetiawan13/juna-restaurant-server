const request = require('supertest')
const express = require("express");
const app = require('../app')
const {sequelize} = require('../models')



const foodList = require('../data/food.json')
foodList.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
    el.additionalInfos = el.additionalInfos.join(", ")
})

const coupons = require('../data/coupon.json')
coupons.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
})


beforeAll( async () => {
    try {
        await sequelize.queryInterface.bulkInsert('Food', foodList)
        await sequelize.queryInterface.bulkInsert('Coupons', coupons)
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
        await sequelize.queryInterface.bulkDelete('Coupons', null, {
          truncate: true,
          restartIdentity: true,
          cascade: true
      })
    } catch(err) {
        console.log(err)
    }
}) 

describe('transaction routes', function() {
  describe('POST /transaction/create', function() {
    it(`should succesfully add transaction`, async function() {
      const response = await request(app)
        .post('/transaction/create')
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
        .post('/transaction/create')
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
        .post('/transaction/create')
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
        .post('/transaction/create')
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
        .post('/transaction/create')
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
        .post('/transaction/create')
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
        .post('/transaction/create')
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


  describe('POST /transaction/find', function() {
    const d = new Date()
    const date = d.getDate()

    it(`should return list of orders from specific transaction and table id`, async function() {
      const newTransactionResponse = await request(app)
        .post('/transaction/create')
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
        .post('/transaction/find')
        .send({
          TransactionId: newTransactionResponse.body.id,
          securityCode: date
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
        .post('/transaction/find')
        .send({
          tableId: 1,
          securityCode: date
        })
      expect(response.status).toEqual(400);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Transaction ID must be provided.')
      })
    });

    it(`should return error 403`, async function() {
      const response = await request(app)
        .post('/transaction/find')
        .send({
          tableId: 1,
          TransactionId: 3,
        })
      expect(response.status).toEqual(403);
      expect(response.body).toMatchObject({
        message: expect.stringContaining('Forbidden.')
      })
    });


  });


});