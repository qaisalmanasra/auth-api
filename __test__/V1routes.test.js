'use strict';

const {db} = require('../src/models/index');
const supertest = require('supertest');
const {app} = require('../src/server');
const mockRequest = supertest(app);

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('Testing for V1 (Unauthenticated API) Routes', () => {

    it('POST /api/v1/:model adds an item to the DB and returns an object with the added item', async () => {
        const res = await mockRequest.post('/api/v1/food').send({
            name: "strawberry",
            price: "50",
            type: "fruit"
        });
        let resObj = JSON.parse(res.text);
        // console.log(res.text,"RESSS");
        // console.log(res.status,"STATUSSSSSSSSSS");
        // console.log(typeof (res.text), "Typeeeeee");
        // console.log('objjjjjjjjjjj',m);
        expect(res.status).toBe(201);
        expect(resObj).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: '50',
                type: expect.any(String),
                updatedAt: expect.any(String),
                createdAt: expect.any(String)
            })
    });

    it('GET/api/v1/:model returns a list of :model items', async () => {
        const res = await mockRequest.get('/api/v1/food');
        let resObj = JSON.parse(res.text);
        expect(res.status).toBe(200);
        // console.log("RESSS",res.text);
        expect(resObj).toStrictEqual([{
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            type: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
        }])
    });

    it('GET /api/v1/:model/ID returns a single item by ID', async () => {
        const res = await mockRequest.get('/api/v1/food/1');
        let resObj = JSON.parse(res.text);
        expect(res.status).toBe(200);
        // console.log("RESSS",res.text);
        expect(resObj).toStrictEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            type: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
        })
    });

    it('PUT /api/v1/:model/ID returns a single, updated item by ID', async () => {
        const res = await mockRequest.put('/api/v1/food/1').send({
            name: "orange",
            price: "20",
            type: "fruit"
        })
        let resObj = JSON.parse(res.text);
        expect(res.status).toBe(200);
        // console.log("RESSS",res.text);
        expect(resObj).toStrictEqual({
            id: 1,
            name: "orange",
            price: "20",
            type: "fruit",
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
        })
    });

    it('DELETE /api/v1/:model/ID returns an empty object.', async () => {
        const res = await mockRequest.delete('/api/v1/food/1')
        expect(res.status).toBe(204);
        // console.log("RESSS",res);
        // expect(res.text).toMatchObject({});
    });

    it('GET /api/v1/:model/ID Subsequent GET for the same ID should result in nothing found', async () => {
    const res = await mockRequest.get('/api/v1/food/1');
    let resObj = JSON.parse(res.text);
    expect(res.status).toBe(200);
    // console.log("RESSS",res.text);
    expect(resObj).toBeNull();
});


});