const request = require('supertest')
const express = require("express");
const app = require('../app')
const {sequelize} = require('../models')



const foodList = require('../data/food.json')
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

describe('food routes', function() {
    describe('GET /food', function() {
        it('should respond with food list with status 200', async function() {
          const response = await request(app)
            .get('/food')
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array)
          expect(response.body[0]).toBeInstanceOf(Object)
          expect(response.body[0]).toHaveProperty("id", expect.any(Number))
          expect(response.body[0]).toHaveProperty("name", expect.any(String))
          expect(response.body[0]).toHaveProperty("toppings", expect.any(String))
          expect(response.body[0]).toHaveProperty("price", expect.any(Number))
          expect(response.body[0]).toHaveProperty("picture", expect.any(String))
          expect(response.body[0]).toHaveProperty("additionalInfos", expect.any(String))
          expect(response.body[0]).toHaveProperty("createdAt", expect.any(String))
          expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String))
        });
    });
});

