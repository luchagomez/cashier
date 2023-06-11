const assert = require('assert');
const yaml = require('yamljs');
const fs = require('fs');

const { verifyIndividualProductPrices, 
        verifyProductsInCart,
        verifyTotalPrice 
      } = require('../actions/actions.js');

const productsFilePath = 'priv/assets/products.yml';
const rulesFilePath = 'priv/assets/rules.yml';

const productsContent = fs.readFileSync(productsFilePath, 'utf8');
const rulesContent = fs.readFileSync(rulesFilePath, 'utf8');

const products = yaml.parse(productsContent).products;
const rules = yaml.parse(rulesContent);

describe('Cashier tests', () => {
    let data;

    before(() => {
        const testData = fs.readFileSync('priv/utils/productsData.json', 'utf8');
        data = JSON.parse (testData);
    })
///***TEST 1***
    it('Verify individual product prices when no rules are applied', () => {
    verifyIndividualProductPrices(data.GreenTea.code, data.GreenTea.price);
    verifyIndividualProductPrices(data.Strawberries.code, data.Strawberries.price);
    verifyIndividualProductPrices(data.Coffee.code, data.Coffee.price);
  });
///***TEST 2***
  it ('Verify the quantity of products and total price in the cart when 1 GR1 item is added.', () => {
    verifyProductsInCart(data.GreenTea.code, data.GreenTea.itemsInCart, data.GreenTea.itemsAdded);
    verifyTotalPrice(data.GreenTea.code, data.GreenTea.itemsAdded, data.GreenTea.pricex4items);
  })

///***TEST 3***
  it ('Verify the quantity of products and total price in the cart when 5 GR1 items are added.', () => {
    verifyProductsInCart(data.GreenTea.code, 10, 5);
    verifyTotalPrice(data.GreenTea.code, 5, data.GreenTea.pricex5items);  
  })

///***TEST 4***
it ('Verify the quantity of products and total price in the cart when 3 SR1 item are added.', () => {
  
})
});