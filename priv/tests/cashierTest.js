const assert = require('assert');
const yaml = require('yamljs');
const products_data = yaml.load('priv/assets/products.yml');
const rules_data = yaml.load('priv/assets/rules.yml');

describe(' Verify which rule should apply and the quantity of products and total price in the cart when 5 GR1 items are added.', () => {
    it('should apply rule applied and total price when 5 Grean Tea units are added to the cart', () => {
        const cart = {
            GR1 : {products_data: null, quantity: 5 },
        };
        console.log(cart);
        assert.strictEqual(products_data)
    })
})