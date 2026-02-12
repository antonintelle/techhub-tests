import { test, expect } from "./pages/fixture";

test.beforeEach(async ({ homePage }) => {
    await homePage.goto(); 
});  

test('Add product to cart', async ({ homePage, productsPage }) => {
    await homePage.goToProducts();
    await productsPage.clickProduct1();
    await productsPage.addToCart();

    await expect(productsPage.cartCounter).toHaveText("1");
});

test('Add multiple products to cart', async ({ homePage, productsPage }) => {
    await homePage.goToProducts();
    await productsPage.clickProduct1();
    await productsPage.addToCart();
    await productsPage.addToCart();
    await productsPage.addToCart();

    await expect(productsPage.cartCounter).toHaveText("3");
});