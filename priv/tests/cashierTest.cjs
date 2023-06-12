const yaml = require('yamljs');
const fs = require('fs');

const { verifyIndividualProductPrices, 
        verifyProductsInCartForOneItemType,
        verifyItemsPrice,
        verifyRuleApplied,
        verifyProductsInCartForTwoItemTypes, 
        verifyRulesApplied,
        verifyPriceForTwoItemTypes,
        verifyProductsInCartForThreeItemTypes,
        verifyRulesAppliedForThereeItems,
        verifyPriceForThreeItemTypes,
        verifyEmptyCart,
        verifyPricesForEmptyCart,
        verifyPriceForItemsWithoutRules,
        verifyNoRulesAppliedForItemsWithoutRules,
        verifyProductsInCartForItemsWithoutRules,
        verifyPriceForNonExistentProduct,
        verifyNoRulesAppliedForNonExistentProduct
      } = require('../actions/actions.js');

describe('Cashier tests', () => {
    let data;

    before(() => {
        const testData = fs.readFileSync('priv/utils/testData.json', 'utf8');
        data = JSON.parse (testData);
    })
///***TEST 1***
    it('Verify individual product prices when no rules are applied', () => {
    verifyIndividualProductPrices(data.test_1.GreenTea.code, data.test_1.GreenTea.price);
    verifyIndividualProductPrices(data.test_1.Strawberries.code, data.test_1.Strawberries.price);
    verifyIndividualProductPrices(data.test_1.Coffee.code, data.test_1.Coffee.price);
  });
///***TEST 2***
  it ('Verify the quantity of products, rule applied, and total price in the cart when 1 GR1 item is added.', () => {
    verifyProductsInCartForOneItemType(data.test_2.GreenTea.code, data.test_2.GreenTea.itemsInCart, data.test_2.GreenTea.itemsAdded);
    verifyRuleApplied(data.test_2.GreenTea.code, data.test_2.GreenTea.rule, data.test_2.GreenTea.itemsAdded);
    verifyItemsPrice(data.test_2.GreenTea.code, 1, data.test_2.GreenTea.price);
  })

///***TEST 3***
  it ('Verify the number of products, the rule applied, and total price in the cart when 5 GR1 items are added.', () => {
    verifyProductsInCartForOneItemType(data.test_3.GreenTea.code, data.test_3.GreenTea.itemsInCart, data.test_3.GreenTea.itemsAdded);
    verifyRuleApplied(data.test_3.GreenTea.code, data.test_3.GreenTea.rule, data.test_3.GreenTea.itemsAdded);
    verifyItemsPrice(data.test_3.GreenTea.code, data.test_3.GreenTea.itemsAdded, data.test_3.GreenTea.pricex5items);
  })

///***TEST 4***
it ('Verify the number of products, the rule applied, and total price in the cart when 3 SR1 item are added.', () => {
  verifyProductsInCartForOneItemType(data.test_4.Strawberries.code, data.test_4.Strawberries.itemsInCart, data.test_4.Strawberries.itemsAdded);
  verifyRuleApplied(data.test_4.Strawberries.code, data.test_4.Strawberries.rule, data.test_4.Strawberries.itemsAdded);
  verifyItemsPrice(data.test_4.Strawberries.code, data.test_4.Strawberries.itemsAdded, data.test_4.Strawberries.price);  
})

 
///***TEST 5***
it ('Verify the number of products, the rule applied, and total price in the cart when 4 SR1 items are added.', () => {
  verifyProductsInCartForOneItemType(data.test_5.Strawberries.code, data.test_5.Strawberries.itemsInCart, data.test_5.Strawberries.itemsAdded);
  verifyRuleApplied(data.test_5.Strawberries.code, data.test_5.Strawberries.rule, data.test_5.Strawberries.itemsAdded);
  verifyItemsPrice(data.test_5.Strawberries.code, data.test_5.Strawberries.itemsAdded, data.test_5.Strawberries.pricex4items);  
})

///***TEST 6***
it ('Verify the number of products, the rule applied, and total price in the cart when 6 SR1 items are added.', () => {
  verifyProductsInCartForOneItemType(data.test_6.Strawberries.code, data.test_6.Strawberries.itemsInCart, data.test_6.Strawberries.itemsAdded);
  verifyRuleApplied(data.test_6.Strawberries.code, data.test_6.Strawberries.rule, data.test_6.Strawberries.itemsAdded);
  verifyItemsPrice(data.test_6.Strawberries.code, data.test_6.Strawberries.itemsAdded, data.test_6.Strawberries.pricex6items);  
 
})

///***TEST 7***
it ('Verify the number of products, the rule applied, and total price in the cart when 2 CF1 items are added.', () => {
  verifyProductsInCartForOneItemType(data.test_7.Coffee.code, data.test_7.Coffee.itemsInCart, data.test_7.Coffee.itemsAdded);
  verifyRuleApplied(data.test_7.Coffee.code, data.test_7.Coffee.rule, data.test_7.Coffee.itemsAdded);
  verifyItemsPrice(data.test_7.Coffee.code, data.test_7.Coffee.itemsAdded, data.test_7.Coffee.pricex2items);  
})

///***TEST 8***
it ('Verify the number of products, the rule applied, and total price in the cart when 3 CF1 item are added.', () => {
  verifyProductsInCartForOneItemType(data.test_8.Coffee.code, data.test_8.Coffee.itemsInCart, data.test_8.Coffee.itemsAdded);
  verifyRuleApplied(data.test_8.Coffee.code, data.test_8.Coffee.rule, data.test_8.Coffee.itemsAdded);
  verifyItemsPrice(data.test_8.Coffee.code, data.test_8.Coffee.itemsAdded, data.test_8.Coffee.pricex3items);  
})

///***TEST 9***
it ('Verify the number of products, the rule applied, and total price in the cart when 6 CF1 item are added.', () => {
  verifyProductsInCartForOneItemType(data.test_9.Coffee.code, data.test_9.Coffee.itemsInCart, data.test_9.Coffee.itemsAdded);
  verifyRuleApplied(data.test_9.Coffee.code, data.test_9.Coffee.rule, data.test_9.Coffee.itemsAdded);
  verifyItemsPrice(data.test_9.Coffee.code, data.test_9.Coffee.itemsAdded, data.test_9.Coffee.pricex6items);  
})

///***TEST 10***
it ('Verify the number of products, the rule applied, and total price in the cart when 1 GR1 and 1 SR1 items are added.', () => {
  verifyProductsInCartForTwoItemTypes(data.test_10.GreenTea.code, data.test_10.GreenTea.itemsInCart, data.test_10.GreenTea.itemsAdded, 
                                      data.test_10.Strawberries.code, data.test_10.Strawberries.itemsInCart,
                                      data.test_10.Strawberries.itemsAdded);
  verifyRulesApplied(data.test_10.GreenTea.code, data.test_10.GreenTea.rule, data.test_10.GreenTea.itemsAdded, 
                 data.test_10.Strawberries.code, data.test_10.Strawberries.rule, data.test_10.Strawberries.itemsAdded);
  verifyPriceForTwoItemTypes(data.test_10.GreenTea.code, data.test_10.GreenTea.itemsAdded, data.test_10.GreenTea.price, 
                                data.test_10.Strawberries.code, data.test_10.Strawberries.itemsAdded, data.test_10.Strawberries.price);
})

///***TEST 11***
it ('Verify the number of products, the rule applied, and total price in the cart when 2 GR1 and 4 SR1 items are added.', () => {
  verifyProductsInCartForTwoItemTypes(data.test_11.GreenTea.code, data.test_11.GreenTea.itemsInCart, data.test_11.GreenTea.itemsAdded, 
                                      data.test_11.Strawberries.code, data.test_11.Strawberries.itemsInCart, data.test_11.Strawberries.itemsAdded);
  verifyRulesApplied(data.test_11.GreenTea.code, data.test_11.GreenTea.rule, data.test_11.GreenTea.itemsAdded, 
                 data.test_11.Strawberries.code, data.test_11.Strawberries.rule, data.test_11.Strawberries.itemsAdded);
  verifyPriceForTwoItemTypes(data.test_11.GreenTea.code, data.test_11.GreenTea.itemsAdded, data.test_11.GreenTea.pricex4items, 
                                data.test_11.Strawberries.code, data.test_11.Strawberries.itemsAdded, data.test_11.Strawberries.pricex4items);
})

///***TEST 12***
it ('Verify number of products, the rule applied, and total price in the cart when 1 GR1 and 2 CF1 items are added.', () => {
  verifyProductsInCartForTwoItemTypes(data.test_12.GreenTea.code, data.test_12.GreenTea.itemsInCart, data.test_12.GreenTea.itemsAdded, 
                                      data.test_12.Coffee.code, data.test_12.Coffee.itemsInCart, data.test_12.Coffee.itemsAdded);
  verifyRulesApplied(data.test_12.GreenTea.code, data.test_12.GreenTea.rule, data.test_11.GreenTea.itemsAdded, 
                 data.test_12.Coffee.code, data.test_12.Coffee.rule, data.test_12.Coffee.itemsAdded);
  verifyPriceForTwoItemTypes(data.test_12.GreenTea.code, data.test_12.GreenTea.itemsAdded, data.test_12.GreenTea.price, 
                                data.test_12.Coffee.code, data.test_12.Coffee.itemsAdded, data.test_12.Coffee.pricex2items);
})
///***TEST 13***
it ('Verify the number of products, the rule applied, and total price in the cart when 1 GR1 and 3 CF1 items are added.', () => {
  verifyProductsInCartForTwoItemTypes(data.test_13.GreenTea.code, data.test_13.GreenTea.itemsInCart, data.test_13.GreenTea.itemsAdded, 
                                      data.test_13.Coffee.code, data.test_13.Coffee.itemsInCart, data.test_13.Coffee.itemsAdded);
  verifyRulesApplied(data.test_13.GreenTea.code, data.test_13.GreenTea.rule, data.test_13.GreenTea.itemsAdded, 
                 data.test_13.Coffee.code, data.test_13.Coffee.rule, data.test_13.Coffee.itemsAdded);
  verifyPriceForTwoItemTypes(data.test_13.GreenTea.code, data.test_13.GreenTea.itemsAdded, data.test_13.GreenTea.price, 
                                data.test_13.Coffee.code, data.test_13.Coffee.itemsAdded, data.test_13.Coffee.pricex3items);
})

///***TEST 14***
it ('Verify the number of products, the rule applied, and total price in the cart when 1 GR1, 1 SR1, and 1 CF1 items are added.', () => {
  verifyProductsInCartForThreeItemTypes(data.test_14.GreenTea.code, data.test_14.GreenTea.itemsInCart, data.test_14.GreenTea.itemsAdded, 
                                      data.test_14.Strawberries.code, data.test_14.Strawberries.itemsInCart, data.test_14.Strawberries.itemsAdded,
                                      data.test_14.Coffee.code, data.test_14.Coffee.itemsInCart, data.test_14.Coffee.itemsAdded);
  verifyRulesAppliedForThereeItems(data.test_14.GreenTea.code, data.test_14.GreenTea.rule, data.test_14.GreenTea.itemsAdded, 
                                  data.test_14.Strawberries.code, data.test_14.Strawberries.rule, data.test_14.Strawberries.itemsAdded,
                                  data.test_14.Coffee.code, data.test_14.Coffee.rule, data.test_14.Coffee.itemsAdded);
  verifyPriceForThreeItemTypes(data.test_14.GreenTea.code, data.test_14.GreenTea.itemsAdded, data.test_14.GreenTea.price, 
                               data.test_14.Strawberries.code, data.test_14.Strawberries.itemsAdded, data.test_14.Strawberries.price,
                               data.test_14.Coffee.code, data.test_14.Coffee.itemsAdded, data.test_14.Coffee.price);
})

///***TEST 15***
it ('Verify the number of products, the rule applied, and total price in the cart when 2 GR1, 4 SR1, and 3 CF1 items are added.', () => {
  verifyProductsInCartForThreeItemTypes(data.test_15.GreenTea.code, data.test_15.GreenTea.itemsInCart, data.test_15.GreenTea.itemsAdded, 
                                      data.test_15.Strawberries.code, data.test_15.Strawberries.itemsInCart, data.test_15.Strawberries.itemsAdded,
                                      data.test_15.Coffee.code, data.test_15.Coffee.itemsInCart, data.test_15.Coffee.itemsAdded);
  verifyRulesAppliedForThereeItems(data.test_15.GreenTea.code, data.test_15.GreenTea.rule, data.test_15.GreenTea.itemsAdded, 
                                  data.test_15.Strawberries.code, data.test_15.Strawberries.rule, data.test_15.Strawberries.itemsAdded,
                                  data.test_15.Coffee.code, data.test_15.Coffee.rule, data.test_15.Coffee.itemsAdded);
  verifyPriceForThreeItemTypes(data.test_15.GreenTea.code, data.test_15.GreenTea.itemsAdded, data.test_15.GreenTea.price, 
                               data.test_15.Strawberries.code, data.test_15.Strawberries.itemsAdded, data.test_15.Strawberries.pricex4items,
                               data.test_15.Coffee.code, data.test_15.Coffee.itemsAdded, data.test_15.Coffee.pricex3items);
 })

///***TEST 16***
it ('Verify the number of products, the rule applied, and total price when no items are added in the cart.', () => {
  verifyEmptyCart (data.test_16.noItem.code, data.test_16.noItem.itemsInCart, data.test_16.noItem.itemsAdded);
  verifyPricesForEmptyCart (data.test_16.noItem.code, data.test_16.noItem.itemsAdded, data.test_16.noItem.price)
})

///***TEST 17***
it ('Verify the number of products, the rule applied, and total price when an item without rule is added to the cart (EGT1).', () => {
  verifyProductsInCartForItemsWithoutRules (data.test_17.code, data.test_17.itemsInCart, data.test_17.itemsAdded);
  verifyNoRulesAppliedForItemsWithoutRules (data.test_17.code, data.test_17.rule, data.test_17.itemsAdded)
  verifyPriceForItemsWithoutRules (data.test_17.code, data.test_17.itemsAdded, data.test_17.price)
})

///***TEST 18***
it ('Verify the number of products, the applied rule, and total price when there is no available information about prices for the selected item.', () => {
  verifyEmptyCart (data.test_18.code, data.test_18.itemsInCart, data.test_18.itemsAdded);
  verifyNoRulesAppliedForNonExistentProduct (data.test_18.code, data.test_18.rule, data.test_18.itemsAdded)
  verifyPriceForNonExistentProduct (data.test_18.code, data.test_18.rule, data.test_18.itemsAdded)
})

}); 