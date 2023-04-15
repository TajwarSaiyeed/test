var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)

const { getProducts, getOrders } = require('../../../backend/logic/shopifyApi.js');

describe('getProducts', function() {
    it('should return array', function() {
        this.timeout(20000);
        return chai.assert.eventually.typeOf(getProducts(), 'array');
    })
})

describe('getOrders', function() {
    it('should return array', function() {
        this.timeout(20000);
        return chai.assert.eventually.typeOf(getOrders(), 'array');
    })
})