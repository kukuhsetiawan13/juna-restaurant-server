const request = require('supertest')
const express = require("express");
const app = require('../app')
const {sequelize} = require('../models')



const coupons = require('../data/coupon.json')
coupons.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
})


beforeAll( async () => {
    try {
        await sequelize.queryInterface.bulkInsert('Coupons', coupons)
    } catch (err) {
        console.log(err)
    }
}) 


afterAll( async () => {
    try {
        await sequelize.queryInterface.bulkDelete('Coupons', null, {
          truncate: true,
          restartIdentity: true,
          cascade: true
      })
    } catch(err) {
        console.log(err)
    }
})

describe('coupon routes', function() {
    describe('GET /coupons', function() {
        it('should respond with coupon list with status 200', async function() {
          const response = await request(app)
            .get('/coupons')
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Array)
          expect(response.body[0]).toBeInstanceOf(Object)
          expect(response.body[0]).toHaveProperty("id", expect.any(Number))
          expect(response.body[0]).toHaveProperty("name", expect.any(String))
          expect(response.body[0]).toHaveProperty("type", expect.any(String))
          expect(response.body[0]).toHaveProperty("discount", expect.any(String))
          expect(response.body[0]).toHaveProperty("freeItem", expect.any(String))
          expect(response.body[0]).toHaveProperty("minimumPurchase", expect.any(Number))
          expect(response.body[0]).toHaveProperty("backgroundImage", expect.any(String))
          expect(response.body[0]).toHaveProperty("createdAt", expect.any(String))
          expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String))
        });
    });

    describe('GET /coupons/verify', function() {
        it('should respond with verified coupon with status 200', async function() {
          const response = await request(app)
            .get('/coupons/verify')
            .send({
                coupon: 'PIZZAFEST'
              })
          expect(response.status).toEqual(200);
          expect(response.body).toBeInstanceOf(Object)
          expect(response.body).toHaveProperty("id", expect.any(Number))
          expect(response.body).toHaveProperty("name", expect.any(String))
          expect(response.body).toHaveProperty("type", expect.any(String))
          expect(response.body).toHaveProperty("discount", expect.any(String))
          expect(response.body).toHaveProperty("freeItem", expect.any(String))
          expect(response.body).toHaveProperty("minimumPurchase", expect.any(Number))
          expect(response.body).toHaveProperty("backgroundImage", expect.any(String))
          expect(response.body).toHaveProperty("createdAt", expect.any(String))
          expect(response.body).toHaveProperty("updatedAt", expect.any(String))
        });

        it('should respond with error 400', async function() {
            const response = await request(app)
              .get('/coupons/verify')
              .send({
                  coupon: ''
                })
            expect(response.status).toEqual(400);
            expect(response.body).toMatchObject({
                message: expect.stringContaining('Coupon must be provided.')
            })
          });

          it('should respond with error 404', async function() {
            const response = await request(app)
              .get('/coupons/verify')
              .send({
                  coupon: 'PIZZAFES'
                })
            expect(response.status).toEqual(404);
            expect(response.body).toMatchObject({
                message: expect.stringContaining('Data not found.')
            })
          });
    });
});
