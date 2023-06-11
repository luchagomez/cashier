const yaml = require('yamljs');
const fs = require('fs');

const { verifyIndividualProductPrices, 
        verifyProductsInCartForOneItemType,
        verifyTotalPriceForOneItemType,
        verifyRuleApplied,
        verifyProductsInCartFor2ItemTypes, 
        verifyRulesApplied,
        verifyTotalPriceFor2ItemTypes
      } = require('../actions/actions.js');

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
  it ('Verify the quantity of products, rule applied, and total price in the cart when 1 GR1 item is added.', () => {
    verifyProductsInCartForOneItemType(data.GreenTea.code, data.GreenTea.itemsInCart, data.GreenTea.itemsAdded);
    verifyRuleApplied(data.GreenTea.code,data.GreenTea.rule);
    verifyTotalPriceForOneItemType(data.GreenTea.code, 1, data.GreenTea.price);
  })

///***TEST 3***
  it ('Verify the number of products, the rule applied, and total price in the cart when 5 GR1 items are added.', () => {
    verifyProductsInCartForOneItemType(data.GreenTea.code, 10, 5);
    verifyRuleApplied(data.GreenTea.code,data.GreenTea.rule);
    verifyTotalPriceForOneItemType(data.GreenTea.code, 5, data.GreenTea.pricex5items);  
  })

///***TEST 4***
it ('Verify the number of products, the rule applied, and total price in the cart when 3 SR1 item are added.', () => {
  verifyProductsInCartForOneItemType(data.Strawberries.code, 3, 3);
  verifyRuleApplied(data.Strawberries.code,data.Strawberries.rule);
  verifyTotalPriceForOneItemType(data.Strawberries.code, 3, data.Strawberries.price);  
})

///***TEST 5***
it ('Verify the number of products, the rule applied, and total price in the cart when 4 SR1 items are added.', () => {
  verifyProductsInCartForOneItemType(data.Strawberries.code, 4, 4);
  verifyRuleApplied(data.Strawberries.code,data.Strawberries.rule);
  verifyTotalPriceForOneItemType(data.Strawberries.code, 4, data.Strawberries.pricex4items);  
})
///***TEST 6***
it ('Verify the number of products, the rule applied, and total price in the cart when 6 SR1 items are added.', () => {
  verifyProductsInCartForOneItemType(data.Strawberries.code, 6, 6);
  verifyRuleApplied(data.Strawberries.code,data.Strawberries.rule);
  verifyTotalPriceForOneItemType(data.Strawberries.code, 6, data.Strawberries.pricex6items);  
})

///***TEST 7***
it ('Verify the number of products, the rule applied, and total price in the cart when 2 CF1 items are added.', () => {
  verifyProductsInCartForOneItemType(data.Coffee.code, 2, 2);
  verifyRuleApplied(data.Coffee.code,data.Coffee.rule);
  verifyTotalPriceForOneItemType(data.Coffee.code, 2, data.Coffee.pricex2items);  
})

///***TEST 8***
it ('Verify the number of products, the rule applied, and total price in the cart when 3 CF1 item are added.', () => {
  verifyProductsInCartForOneItemType(data.Coffee.code, 3, 3);
  verifyRuleApplied(data.Coffee.code,data.Coffee.rule);
  verifyTotalPriceForOneItemType(data.Coffee.code, 3, data.Coffee.pricex3items);  
})

///***TEST 9***
it ('Verify the number of products, the rule applied, and total price in the cart when 6 CF1 item are added.', () => {
  verifyProductsInCartForOneItemType(data.Coffee.code, 6, 6);
  verifyRuleApplied(data.Coffee.code,data.Coffee.rule);
  verifyTotalPriceForOneItemType(data.Coffee.code, 6, data.Coffee.pricex6items);  
})

///***TEST 10***
it ('Verify the number of products, the rule applied, and total price in the cart when 1 GR1 and 1 SR1 items are added.', () => {
  verifyProductsInCartFor2ItemTypes(data.Coffee.code, 6, 6);
  verifyRulesApplied(data.Coffee.code,data.Coffee.rule);
  verifyTotalPriceFor2ItemTypes(data.Coffee.code, 6, data.Coffee.pricex6items);  
})

});