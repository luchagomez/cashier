const assert = require('assert');
const yaml = require('yamljs');
const fs = require('fs');

const productsFilePath = 'priv/assets/products.yml';
const rulesFilePath = 'priv/assets/rules.yml';

const productsContent = fs.readFileSync(productsFilePath, 'utf8');
const rulesContent = fs.readFileSync(rulesFilePath, 'utf8');
const products = yaml.parse(productsContent).products;
const rules = yaml.parse(rulesContent).rules;


const verifyIndividualProductPrices = (testProductCode, testProductPrice) => {
    const expectedPrice = testProductPrice;
    const actualPrice = getProductPrice (testProductCode);  
       
    assert.strictEqual(
        actualPrice,
        expectedPrice,
        "Incorrect price for product " + testProductCode + ". Expected: " + expectedPrice + ", Actual: " + actualPrice
    ); 
};

function getProductPrice(productCode) {
    const product = products.find(p=> p.product_code === productCode);
    return product ? product.price : null;
};

function getReducePrice (productCode) {
    const rulePrice = rules.find(p=> p.product_code === productCode)
    return rulePrice ? rulePrice.price_per_product: null;
}

function getFractionPrice (productCode) {
    const rulePrice = rules.find(p=> p.product_code === productCode)
    return rulePrice ? rulePrice.fraction_price: null;
}

const verifyProductsInCart = (testProductCode, itemsCart, itemsAdded) => {
    if (testProductCode === 'GR1') {
        const expectedItemsCart = itemsAdded * 2;
        if (itemsCart !== expectedItemsCart) {
            throw new Error('Free item missing for productCode ' + testProductCode); 
        }
     }
    else { 
        const expectedItemsCart = itemsAdded;
        throw new Error ('Invalid item quantity for ' + testProductCode)
    }
}

const verifyTotalPrice = (testProductCode, itemsAdded, priceInCart) => {
    const productPrice = getProductPrice (testProductCode); 
    if (testProductCode === 'GR1') {
        const totalPrice = productPrice * itemsAdded;
        const expectedTotalPrice= parseFloat(totalPrice.toFixed(2));
        console.log('expected total' + expectedTotalPrice);
        if (expectedTotalPrice !== priceInCart) {
            console.log('priceInCart' + priceInCart);
            throw new Error('Invalid price for ' + testProductCode); 
        }
    } else if (testProductCode === 'SR1') {
        const reducePrice= getReducePrice(testProductCode);
        if (itemsAdded > 3) {
            const expectedTotalPrice = reducePrice * itemsAdded;
            if (expectedTotalPrice !== priceInCart) {
                throw new Error('Invalid price for ' + testProductCode); 
            }
         } else {
                const expectedTotalPrice = productPrice * itemsAdded;
                if (expectedTotalPrice != priceInCart) {
                throw new Error('Invalid price for ' + testProductCode); 
            }
        }
      } else {
      const fractionPrice= getFractionPrice(testProductCode);
      if (itemsAdded > 2) {
        const expectedTotalPrice = itemsAdded * fractionPrice;
        if (expectedTotalPrice !== priceInCart) {
            throw new Error('Invalid price for ' + testProductCode); 
        } else {
            const expectedTotalPrice = itemsAdded * productPrice
            if (expectedTotalPrice != priceInCart){
            throw new Error('Invalid price for ' + testProductCode); 
        }     
        }
      }
    }
}

module.exports = {
    verifyIndividualProductPrices,
    verifyProductsInCart,
    verifyTotalPrice
};