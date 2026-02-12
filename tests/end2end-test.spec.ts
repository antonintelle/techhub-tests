// tests/auth-to-shopping.spec.ts
import { test, expect } from './pages/fixture';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto(); 
    await homePage.assertLoaded();
});

test('login and buy 2 products', async ({ authPage, homePage, productsPage, cartPage, checkoutPage }) => {
    const email = process.env.EMAIL || 'user@test.com';
    const password = process.env.PASSWORD || 'Password123!';

    // Se connecter
    await homePage.goToAuth();
    await authPage.login(email, password);
    await expect(authPage.loginSuccess).toBeVisible();

    // Naviguer vers les produits
    await homePage.goToProducts();
    await productsPage.assertLoaded();

    // Ajouter deux produits au panier
    await productsPage.clickProduct1();
    await productsPage.addToCart();
    await expect(productsPage.cartCounter).toHaveText("1");
    await productsPage.clickProduct2();
    await productsPage.addToCart();
    await expect(productsPage.cartCounter).toHaveText("2");

    // Aller au panier et vérifier les produits
    await productsPage.goToCart();
    await cartPage.assertLoaded();

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
    
    await checkoutPage.verifyTotalPrice('289.98');
    await checkoutPage.continueToPayment();

    // Page paiement
    await checkoutPage.verifyPaymentFormVisible();
    
    // Payer
    await checkoutPage.pay('1234 5678 9012 3456', 'Antonin TELLE', '12/25', '123');

    await expect(checkoutPage.paymentSuccess).toBeVisible();
});

test('signup and navigate to shopping', async ({ authPage, homePage, productsPage }) => {
    const name = faker.person.fullName(); 
    const email = faker.internet.email(); 
    const password = faker.internet.password({ length: 12 }); 
    
    await authPage.goto();
    await authPage.signup(name, email, password); 
    await expect(authPage.signupSuccess).toBeVisible(); 

    await homePage.goToProducts(); 
    await productsPage.assertLoaded(); 
});  
