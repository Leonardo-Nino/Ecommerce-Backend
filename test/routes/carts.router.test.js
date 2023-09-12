import { expect } from "chai";
import supertest from "supertest";


const requester = supertest('http://localhost:4000')


describe('Test cart routes', () => {

    it('[POST] api/cart/:cid/product/:pid Successful to add product to cart ', async () => {
        const response = await requester
            .post('/api/carts/64e9acb1a418531df82e40cd/product/646f48b0c0017679d4336cdb')
            .send({ quantity: 1 })
        expect(response.statusCode).to.be.eql(200)
        expect(response.text).to.equal('Product added to cart')

    })

    it('[POST] api/cart/:cid/product/:pid Error adding product (Quantity = 0 ) ', async () => {
        const response = await requester
            .post('/api/carts/64e9acb1a418531df82e40cd/product/646f48b0c0017679d4336cdb')
            .send({ quantity: 0 })
        expect(response.body.error).to.be.eql('Product creation error');
    })

    it('[DELETE] api/cart/:cid/product/:pid Delete one product of a cart', async () => {
        const response = await requester
            .delete('/api/carts/64e9acb1a418531df82e40cd/product/646f48b0c0017679d4336cdb')
        expect(response.statusCode).to.be.eql(200);
        expect(response.text).to.be.equal('Product removed successfully')
    });

})