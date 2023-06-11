const assert = require('assert');
const yaml = require('yamljs');
const fs = require('fs');

const productsFilePath = 'priv/assets/products.yml';
const rulesFilePath = 'priv/assets/rules.yml';

const productsContent = fs.readFileSync(productsFilePath, 'utf8');
const rulesContent = fs.readFileSync(rulesFilePath, 'utf8');
const products = yaml.parse(productsContent).products;
const rules = yaml.parse(rulesContent).discount_rules;

function getProductPrice(productCode) {
    const product = products.find(p=> p.product_code === productCode);
    return product ? product.price : null;
};

function getReducePrice (productCode) {
    const rulePrice = rules.find(p=> p.product_code === productCode);
    return rulePrice ? rulePrice.price_per_product: null;
}

function getProductRule (productCode) {
    const ruleType = rules.find(p=> p.product_code === productCode);
    return ruleType ? ruleType.type: null
}

function getFractionPrice (productCode) {
    const rulePrice = rules.find(p=> p.product_code === productCode);
    return rulePrice ? rulePrice.fraction_price: null;
}

const verifyIndividualProductPrices = (testProductCode, testProductPrice) => {
    const expectedPrice = testProductPrice;
    const actualPrice = getProductPrice (testProductCode);  
       
    assert.strictEqual(
        actualPrice,
        expectedPrice,
        "Incorrect price for product " + testProductCode + ". Expected: " + expectedPrice + ", Actual: " + actualPrice
    ); 
};

const verifyRuleApplied = (productCode, rule) => {
    const productRule = getProductRule (productCode);
    if (productRule!== rule) {
        throw new Error ('product Rule not found for product ' + productCode)
    }
}
const verifyProductsInCartForOneItemType = (testProductCode, itemsCart, itemsAdded) => {
    if (testProductCode === 'GR1') {
        const expectedItemsCart = itemsAdded * 2;
        if (itemsCart !== expectedItemsCart) {
            throw new Error('Free items missing for productCode ' + testProductCode); 
        }
     }
    else { 
        const expectedItemsCart = itemsAdded;
        if (itemsCart !== expectedItemsCart) {
            throw new Error ('Invalid item quantity for ' + testProductCode)
        }
    }
}

const verifyTotalPriceForOneItemType = (testProductCode, itemsAdded, priceInCart) => {
    const productPrice = getProductPrice (testProductCode); 
    if (testProductCode === 'GR1') {
        const totalPrice = productPrice * itemsAdded;
        const expectedTotalPrice= parseFloat(totalPrice.toFixed(2));
        console.log('TOTAL PRICE ' + priceInCart, ' EXPECTED PRICE '+ expectedTotalPrice)
        if (expectedTotalPrice !== priceInCart) {
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
                const totalPriceInCart = itemsAdded * priceInCart;
                const expectedTotalPrice = productPrice * itemsAdded;
                if (expectedTotalPrice != totalPriceInCart) {
                throw new Error('Invalid price for ' + testProductCode); 
            }
        }
      } else { 
            const fractionPrice= getFractionPrice(testProductCode);
            const productPrice= getProductPrice(testProductCode);
            if (itemsAdded > 2) {
                console.log("porque paso por acá xq son 3 cafes")
                const expectedTotalPrice = itemsAdded * fractionPrice * productPrice;
                console.log('items agregados al carro ' + itemsAdded);
                console.log('precio fraccionado', + fractionPrice )
                console.log ('precio en el carrito ' + priceInCart, 'precio calculado ' + expectedTotalPrice)
                    if (expectedTotalPrice !== priceInCart) {
                    throw new Error('Invalid price for ' + testProductCode); 
                    }
                } else { 
                        const expectedTotalPrice = itemsAdded * productPrice
                        console.log ('precio en el carrito ' + priceInCart, 'precio calculado ' + expectedTotalPrice)
                        if (expectedTotalPrice != priceInCart){
                            throw new Error('Invalid price for ' + testProductCode); 
                            }     
                    }
        }
}

module.exports = {
    verifyIndividualProductPrices,
    verifyProductsInCartForOneItemType,
    verifyTotalPriceForOneItemType,
    verifyRuleApplied
};