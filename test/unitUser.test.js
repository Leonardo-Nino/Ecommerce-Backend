import '../src/config/configDB.js'
import mongoose from 'mongoose'
import { getUsers } from '../src/DAL/DAOs/mongoDAO/userMongo.js'
import Assert from 'assert'

// mongoose
//     .connect("mongodb+srv://leonardoninio:9DUdr1OD3KiL6Kxe@cluster0.hqyxexs.mongodb.net/?retryWrites=true&w=majority")
//     .then(() => console.log('DB is connected'))
//     .catch((err) => console.log(err))

const assert = Assert.strict

describe("User DAO", () => {

    beforeEach(async function () {
        this.timeout(5000)
    })

    it('getUsers should retrieve all users in an array from the database', async () => {
        const result = await getUsers()

        // console.log(result)

        assert.strictEqual(Array.isArray(result), true)
    })

    // more it here below if it needed
})