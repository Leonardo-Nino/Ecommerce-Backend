import { expect } from "chai";
import supertest from "supertest";
import { deleteProduct } from "../../src/DAL/DAOs/mongoDAO/productMongo.js";


const requester = supertest('http://localhost:4000')



describe('Test product routes', () => {

    it('[GET] api/products Get all product from DB', async () => {
        const response = await requester.get('/api/products/')
        expect(response.statusCode).to.be.eql(200)
        expect(response).to.be.ok;
    })

    it('[GET] api/products/:id Get product by ID', async () => {
        const response = await requester.get('/api/products/646f48b0c0017679d4336cdb')

        expect(response.type).to.be.eql('text/html')
        expect(response.charset).to.be.eql('utf-8')
        expect(response.statusCode).to.be.eql(200)
        expect(response).to.be.ok;

    })

    it('[POST] Create new product on DB', async () => {
        const mockNewProduct = {
            title: "TestProduct",
            description: "Test description",
            price: 1,
            category: "Test category",
            code: "TestCode123",
            stock: 3,
        }
        const response = await requester.post('/api/products').send(mockNewProduct)

        //     expect(response.type).to.be.eql('text/html'):
        //     expect(response.charset).to.be.eql('utf-8')
        expect(response.statusCode).to.be.eql(200)
        //     expect(response).to.be.ok;
        const product = await deleteProduct({ title: mockNewProduct.title })
    })


})

