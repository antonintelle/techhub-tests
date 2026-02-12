import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    minusButton: Locator;
    plusButton: Locator;
    remove: Locator;
    
    clearCart: Locator;
    checkoutButton: Locator;
    continueShopping: Locator;
    cartCount: Locator;

    private productQuantity(id: string) { 
        return this.page.getByTestId(`quantity-${id}`); 
    }

    constructor(private page: Page) {
        this.minusButton = page.getByTestId('decrease-quantity-1');
        this.plusButton = page.getByTestId('increase-quantity-1');
        this.remove = page.getByTestId('remove-item-1');
        this.clearCart = page.getByTestId('clear-cart-button');
        this.checkoutButton = page.getByTestId('checkout-button');
        this.continueShopping = page.getByTestId('continue-shopping-button');
        this.cartCount = page.getByTestId('cart-count');
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL(/cart/);
    }

    async increaseQuantity() {
        await this.plusButton.click();
    }

    async increaseProduct() {
        await this.plusButton.click();
    }

    async decreaseProduct() {
        await this.minusButton.click(); 
    }

    async removeProduct() {
        await this.remove.click();
    }

    async clearCartItems() {
        await this.clearCart.click(); 
    }
    
    async proceedToCheckout() { 
        await this.checkoutButton.click(); 
    }
    
    async continueShoppingClick() { 
        await this.continueShopping.click(); 
    }

    async verifyProductQuantity(quantity: number, productId = '1') {
        await expect(this.productQuantity(productId)).toHaveText(quantity.toString());
    }

    async verifyCartEmpty() {
        await expect(this.page.getByText('Votre Panier est vide')).toBeVisible();
    }

    async verifyTotalPrice(expectedTotal: string) {
        await expect(this.page.locator('[class*="text-2xl"][class*="font-bold"]')).toContainText(expectedTotal);
    }
}
