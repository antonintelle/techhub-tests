import { test, expect } from "./pages/fixture";

test.beforeEach(async ({ productsPage, cartPage }) => {
    await productsPage.goto();
    await productsPage.clickProduct1();
    await productsPage.addToCart();
    await expect(productsPage.cartCounter).toHaveText("1");

    await productsPage.goToCart();
    await cartPage.assertLoaded();
});

test('Increase/decrease product quantity in cart', async ({ productsPage, cartPage }) => {

    // Aller au panier et vérifier quantité initiale = 1
    await cartPage.verifyProductQuantity(1);
    
    // Augmenter à 2
    await cartPage.increaseQuantity();
    await cartPage.verifyProductQuantity(2);
    
    // Diminuer à 1
    await cartPage.decreaseProduct();
    await cartPage.verifyProductQuantity(1);
});

test('Remove product from cart', async ({ cartPage }) => {    
    await cartPage.removeProduct();
    await cartPage.verifyCartEmpty();
    // Le bouton remove disparaît avec le produit
});

test('Clear cart items', async ({ cartPage }) => {
    await cartPage.clearCartItems();
    await cartPage.verifyCartEmpty();
});

test('Proceed to checkout', async ({ productsPage, cartPage }) => {
    await cartPage.verifyTotalPrice('199.99');  // Basé sur prix produit 1
    
    await cartPage.proceedToCheckout();
    await expect(cartPage.checkoutButton).not.toBeVisible();
});
