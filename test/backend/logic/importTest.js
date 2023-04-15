var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { getProducts, getOrders } = require('../../../backend/logic/shopifyApi.js');
const { runImport, createOrder, createItem } = require('../../../backend/logic/import.js');

describe('runImport', function() {
    it('test for debugging purposes', function() {
        this.timeout(20000);

        return chai.assert.eventually.typeOf(runImport(), "string");
    })
})

// describe('createOrder', function() {
//     it('should return an order with an order number', async function() {
//         this.timeout(20000);

//         const orders = await getOrders();
//         const firstOrder = orders[0];

//         return chai.assert.eventually.typeOf(createOrder(firstOrder).orderNumber, 'string');
//     })
// })