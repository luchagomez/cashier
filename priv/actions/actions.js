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
};

function getProductRule (productCode) {
    const ruleType = rules.find(p=> p.product_code === productCode);
    return ruleType ? ruleType.type: 'notRuleApplied'
};

function getQuantityRule (productCode) {
    const quantity = rules.find(p=> p.product_code === productCode);
    return quantity ? quantity.buy_quantity: null
};

const verifyProductsInCart = (productCode, itemsCart, itemsAdded) => {
    productCode= isValidProductCode(productCode);
   
    if (productCode === '' || productCode === 'non Existent') {
        if (itemsCart !== 0) {
          throw new Error('Invalid item quantity for empty cart/non existent product');
        }
        return;
      }

    const expectedItemsCart = productCode ==='GR1' ? itemsAdded * 2: itemsAdded;
    if (itemsCart !== expectedItemsCart){
        throw new Error('Invalid item quantity for ' + productCode);
    }
};

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

const verifyRuleApplied = (productCode, rule, itemsAdded) => {
    const productRule = getProductRule (productCode);
    const quantityRule = getQuantityRule (productCode);

    if (productCode === 'GR1') {
        if (productRule !== rule) {
            throw new Error ('product Rule not found for product ' + productCode)
            } 
        } else {
            if (itemsAdded > quantityRule) {
                if (productRule !== rule) {
                    throw new Error('Product Rule does not match for product ' + productCode);    
                }
            } else {
                if (rule !== 'notRuleApplied'){
                    throw new Error('Invalid rule applied for product ' + productCode);
                }
            }
        }
    }
const verifyProductsInCartForOneItemType = (testProductCode, itemsCart, itemsAdded) => {
    verifyProductsInCart (testProductCode, itemsCart, itemsAdded)
}

const isValidProductCode = (productCode) => {
    const validProductCodes = ['GR1', 'SR1', 'CF1', 'EGT1'];
    return validProductCodes.includes(productCode)  ? productCode: 'nonExistent';
}

const verifyItemsPrice = (testProductCode, itemsAdded, priceInCart) => {
    
    productCode= isValidProductCode(testProductCode);

    if (productCode === '' || productCode === 'nonExistent') {
        if (priceInCart !== 0) {
          throw new Error('Invalid price for empty cart or non existen product');
        }
        return; 
      }

    const productPrice = getProductPrice (testProductCode); 
   
    if (testProductCode === 'GR1' || testProductCode === 'EGT1') {
        const totalPrice = productPrice * itemsAdded;
        const expectedTotalPrice= parseFloat(totalPrice.toFixed(2));
        
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
                const expectedTotalPrice = itemsAdded * fractionPrice * productPrice;
                if (expectedTotalPrice !== priceInCart) {
                    throw new Error('Invalid price for ' + testProductCode); 
                    }
                } else { 
                        const expectedTotalPrice = itemsAdded * productPrice
                        if (expectedTotalPrice != priceInCart){
                            throw new Error('Invalid price for ' + testProductCode); 
                            }     
                    }
        }
}
const verifyProductsInCartForTwoItemTypes = (productCode1, itemsCart1, itemsAdded1, productCode2, itemsCart2, itemsAdded2) => {
    verifyProductsInCart(productCode1, itemsCart1, itemsAdded1);
    verifyProductsInCart(productCode2, itemsCart2, itemsAdded2);  
}
const verifyPriceForTwoItemTypes = (productCode1, itemsAdded1, price1, productCode2, itemsAdded2, price2) => {
    verifyItemsPrice(productCode1, itemsAdded1, price1);
    verifyItemsPrice(productCode2, itemsAdded2, price2);  
}

const verifyRulesApplied = (productCode1, rule1, itemsAdded1, productCode2, rule2, itemsAdded2) => {
    verifyRuleApplied(productCode1, rule1, itemsAdded1);
    verifyRuleApplied(productCode2, rule2, itemsAdded2);  
}

const verifyProductsInCartForThreeItemTypes = (productCode1, itemsCart1, itemsAdded1, productCode2, itemsCart2, itemsAdded2, productCode3, itemsCart3, itemsAdded3) => {
    verifyProductsInCart(productCode1, itemsCart1, itemsAdded1);
    verifyProductsInCart(productCode2, itemsCart2, itemsAdded2);     
    verifyProductsInCart(productCode3, itemsCart3, itemsAdded3); 
}

const verifyRulesAppliedForThereeItems = (productCode1, rule1, itemsAdded1, productCode2, rule2, itemsAdded2,productCode3, rule3, itemsAdded3) => {
    verifyRuleApplied(productCode1, rule1, itemsAdded1);
    verifyRuleApplied(productCode2, rule2, itemsAdded2);  
    verifyRuleApplied(productCode3, rule3, itemsAdded3);  
}

const verifyPriceForThreeItemTypes = (productCode1, itemsAdded1, price1, productCode2, itemsAdded2, price2, productCode3, itemsAdded3, price3) => {
    verifyItemsPrice(productCode1, itemsAdded1, price1);
    verifyItemsPrice(productCode2, itemsAdded2, price2); 
    verifyItemsPrice(productCode3, itemsAdded3, price3); 
}

const verifyEmptyCart = (productCode, itemsAdded, itemsInCart) =>{
    verifyProductsInCart(productCode, itemsAdded, itemsInCart); 
}

const verifyPricesForEmptyCart = (productCode, itemsAdded, price) => {
    verifyItemsPrice(productCode, itemsAdded, price);
}

const verifyNoRulesAppliedForItemsWithoutRules = (productCode, rule, itemsAdded) => {
    verifyRuleApplied(productCode, rule, itemsAdded);
}

const verifyPriceForItemsWithoutRules = (productCode, itemsAdded, price) => {
    verifyItemsPrice(productCode, itemsAdded, price);
}

const verifyProductsInCartForItemsWithoutRules = (productCode, itemsCart, itemsAdded) => {
    verifyProductsInCart (productCode, itemsCart, itemsAdded);
}

const verifyPriceForNonExistentProduct = (productCode, itemsCart, itemsAdded) => {
    verifyItemsPrice (productCode, itemsCart, itemsAdded);
}

const verifyNoRulesAppliedForNonExistentProduct = (productCode, itemsAdded, price) => {
    verifyRuleApplied(productCode, itemsAdded, price);
}


module.exports = {
    verifyIndividualProductPrices,
    verifyProductsInCartForOneItemType,
    verifyItemsPrice,
    verifyRuleApplied,
    verifyProductsInCartForTwoItemTypes,
    verifyRulesApplied,
    verifyProductsInCartForThreeItemTypes,
    verifyPriceForTwoItemTypes,
    verifyRulesAppliedForThereeItems,
    verifyPriceForThreeItemTypes,
    verifyEmptyCart,
    verifyPricesForEmptyCart,
    verifyPriceForItemsWithoutRules,
    verifyNoRulesAppliedForItemsWithoutRules,
    verifyProductsInCartForItemsWithoutRules,
    verifyPriceForNonExistentProduct,
    verifyNoRulesAppliedForNonExistentProduct
};