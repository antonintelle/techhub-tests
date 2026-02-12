import { faker } from "@faker-js/faker";
import { test, expect } from "./pages/fixture";

test.beforeEach(async ({ productsPage, cartPage }) => {
    await productsPage.goto();
    await productsPage.clickProduct1();
    await productsPage.addToCart();
    await expect(productsPage.cartCounter).toHaveText("1");

    await productsPage.goToCart();
    await cartPage.assertLoaded();
    await cartPage.proceedToCheckout();
});

test('test login checkout', async ({ checkoutPage, authPage, homePage, cartPage }) => {
    const email = process.env.EMAIL ||'user@test.com';
    const password = process.env.PASSWORD  ||'Password123!';

    await checkoutPage.login();
    await authPage.login(email, password);
    await homePage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.verifyShippingFormVisible();
    await checkoutPage.fillShippingForm(
        process.env.FIRST_NAME || faker.person.firstName(),
        process.env.LAST_NAME || faker.person.lastName(), 
        process.env.EMAIL || faker.internet.email(), 
        process.env.PHONE || faker.helpers.fromRegExp('0[67][0-9]{8}'), 
        process.env.ADDRESS || faker.location.streetAddress(), 
        process.env.CITY || faker.location.city(), 
        process.env.POSTAL_CODE || faker.location.zipCode()
    );
    
    await checkoutPage.verifyTotalPrice('199.99');
    await checkoutPage.continueToPayment();

    // Page paiement
    await checkoutPage.verifyPaymentFormVisible();
    
    // Payer
    await checkoutPage.pay('1234 5678 9012 3456', 'Antonin TELLE', '12/25', '123');

    await expect(checkoutPage.paymentSuccess).toBeVisible();
});
