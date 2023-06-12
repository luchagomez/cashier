This repository contains the tests for the cashier funtionality.
The tests are written in JavaScript using mocha. To run the tests, make sure to have installed node.js and run the following to install the ependencies required:
1.npm install 

Please make sure these dependencies are installed before running the tests.

**How to run the tests:**
1. Execute npm test

After running the tests you should be able to see the results as follow:
![image](https://github.com/luchagomez/cashier/assets/16385703/e506f0b2-406d-4601-b9de-dfe9069edc41)


**Products and rules**
For this prototype the following products and rules are being use:

**Products:**
- Product Code:  GR1 | Name: Green Tea | Price: £3.11
- Product Code:  SR1 | Name: Strawberries | Price: £5.00
- Product Code:  CF1 | Name: Coffee | Price: £11.23

**Special Rules**
1. GR1 product has the rule "Buy one get one free" (freeRule).
2. SR1 product has the rule "Reduce price buying more than 3 products" (reducePriceRule).
3. CF1 product has the ruel "% discount byuing more than 2 products"(fractionPriceRule).

**Test cases**:

***TEST 1:*** 

*DESCRIPTION*: Verify individual prices for products when no rules are applied.

*EXPECTED RESULT*: 
The price should be the one defined in the **products.yml** file.

***TEST 2***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 1 GR1 item is added. 

*EXPECTED RESULT*: 
 - The freeRule should be applied.
 - 2 items should be added to the cart.
 - Total price should be the one defined in the **products.yml** for GR1 item.

***TEST 3***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 5 GR1 items are added. 

*EXPECTED RESULT*: 
 - The freeRule should be applied. 
 - 10 items should be added to the cart.
 - The price should be the one defined in the **products.yml** file for GR1 item multiplied by 5. 

***TEST 4***

*DESCRTIPTION*: Verify the number of products, the rule applied, and total price in the cart when 3 SR1 item are added. 

*EXPECTED RESULT*: 
 - 3 item should be added to the cart.
 - The  price should be the one defined in the **products.yml** file for the product SR1 multiplied by 3.
  
***TEST 5***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 4 SR1 items are added. 

*EXPECTED RESULT*: 
 - The reducePriceRule should be applied.
 - 4 SR1 items should be added to the cart.
 - The price should be the one defined in the **rules.yml** file for the product SR1 multiplied by 4.

***TEST 6***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 6 SR1 items are added. 

*EXPECTED RESULT*: 
 - The reducePriceRule should be applied.
 - 6 SR1 items should be added to the cart.
 - The total price should be the one defined in the **rules.yml** file for the product SR1 multiplied by 6

***TEST 7***  

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 2 CF1 items are added.  

*EXPECTED RESULT*: 
 - 2 CF1 items should be added to the cart. 
 - The total price should be the one defined in the **products.yml** file for the product CF1 multiplied by 2.

***TEST 8***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 3 CF1 item are added.

*EXPECTED RESULT*: 
 - The fractionPriceRule should be applied.
 - 3 CF1 items should be added to the cart.
 - The price should be the one defined in the **rules.yml** file for the product CF1 multiplied by 3.

***TEST 9***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 6 CF1 item are added.  

*EXPECTED RESULT*: 
 - The fractionPriceRule should be applied.
 - 6 items should be added to the cart.
 - The price should be the one defined in the **rules.yml** file for the product CF1 multiplied by 6.

***TEST 10***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 1 GR1 and 1 SR1 items are added. 

*EXPECTED RESULT*: 
 - The freeRule should be applied for GR1.
 - 3 items should be added to the cart (2 GR1 + 1 SR1)
 - The total price should be SUM of the individual prices defined in the **products.yml** file for both products.

***TEST 11***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 2 GR1 and 4 SR1 items are added.

*EXPECTED RESULT*: 
 - The freeRule should be applied for both GR1 items.
 - The reducePriceRule should be applied for SR1 items.
 - 8 items should be added to the cart (4 GR1 + 4 SR1)
 - The prices for each product should be:
     (SR1 price_per_product from **rules.yml**) * 4
     (GR1 price from **products.yml**) * 4  

***TEST 12***

*DESCRIPTION*: Verify number of products, the rule applied, and total price in the cart when 1 GR1 and 2 CF1 items are added.

*EXPECTED RESULT*: 
 - The freeRule should be applied for both GR1 items.
 - 4 items should be added to the cart (2 GR1 + 2 CF1)
 - The prices for each product should be:
   (GR1 price from **products.yml**) * 1
   (CF1 price from **products.yml**) * 2

***TEST 13***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 1 GR1 and 3 CF1 items are added.

*EXPECTED RESULT*: 
 - The freeRule should be applied for GR1 items.
 - The fractionPriceRule should be applied for CF1 items.
 - 5 items should be added to the cart (2 GR1 + 3 CF1)
 - The total price should be:
     (CF1 price from **products.yml**) * 3 * fraction_price/100 (from **rules.yml**)
 *+* (GR1 price from **products.yml**) * 1  

***TEST 14***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 1 GR1, 1 SR1, and 1 CF1 items are added.
*EXPECTED RESULT*: 
 - The freeRule should be applied for GR1 item.
 - 4 items should be added to the cart (2 GR1 + 1 SR1 + 1 CF1)
 - The prices for each product should be:
   (GR1 price from **products.yml**) * 1
   (SR1 price from **products.yml**) * 1
   (CF1 price from **products.yml**) * 1

***TEST 15***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price in the cart when 2 GR1, 4 SR1, and 3 CF1 items are added

*EXPECTED RESULT*: 
 - The freeRule should be applied for GR1 item.
 - The fractionPriceRule should be applied for CF1 item.
 - 11 items should be added to the cart (4 GR1 + 4 SR1 + 3 CF1)
 - The prices for each product should be:
   (GR1 price from **products.yml**) * 2
   (SR1 price_per_product from **rules.yml**) * 4
   (CF1 price from **products.yml**) * fraction_price/100 (from **rules.yml**) * 3

***TEST 16***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price when no items are added in the cart.

*EXPECTED RESULT*:
 - Quantity and price should be 0.

***TEST 17***

*DESCRIPTION*: Verify the number of products, the rule applied, and total price when an item without rule is added to the cart (EGT1).

*EXPECTED RESULT*:
 - 1 item should be added to the cart.
 - Total price should be EGT1 price from products.yml

***TEST 18***

*DESCRIPTION*: Verify the number of products, the applied rule, and total price when there is no available information about prices for the selected item (non-existent product).

*EXPECTED RESULT*:
 - Error message "no prices for the selected item". 

**TESTS NOT ADDED IN THE CURRENT SOLUTION (PENDING TESTS)**

***TEST 19***
*DESCRIPTION*:
Verify the behavior when adding a negative number of products to the cart.

*EXPECTED RESULT*:
Confirm that the system rejects the input and displays an appropriate error message.

***TEST 20***
*DESCRIPTION*: Verify the behavior when adding a product with an invalid quantity (e.g., a string instead of a number).

*EXPECTED RESULT*: 
Ensure that the system detects this situation and displays an appropriate error message.


***TEST 21***
*DESCRIPTION*: Verify the behavior when modifying the discount rules in the YAML file while the system is running.

*EXPECTED RESULT*: 
Ensure that the system detects the changes in rules and applies them correctly without needing to restart the system.


***TEST 22***
*DESCRIPTION*: Verify the behavior when removing products from the cart.

*EXPECTED RESULT*:
Confirm that the system correctly adjusts the number of products, applied rules, and total price after removing a specific product.

***TEST 23***
*DESCRIPTION*: Verify the behavior when adding a product with more than one rule active.

*EXPECTED RESULT*: 
Confirmr that both rules should be applied.
