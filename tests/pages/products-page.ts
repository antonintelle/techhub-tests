import { Locator, Page, expect } from "@playwright/test";

export class ProductsPage { 

    productContainer1: Locator;
    productContainer2: Locator;
    filtreButton: Locator;
    filtreAccesories: Locator;
    filtreMinus: Locator;
    addToCartButton: Locator;
    cartCounter: Locator;
    cartButton: Locator;

    constructor(private page: Page) {
        this.filtreButton = page.getByRole('button', { name: 'Filtres' });
        this.filtreAccesories = page.getByRole('button', { name: 'Accessoires' });
        this.filtreMinus = page.getByRole('button', { name: 'Moins de 100€' });
        this.productContainer1 = page.getByTestId('product-container-1');
        this.productContainer2 = page.getByTestId('product-container-2');
        this.addToCartButton = page.getByTestId('product-detail-add-to-cart');
        this.cartCounter = page.getByTestId('cart-count');
        this.cartButton = page.getByTestId('cart-button');
    }

    async goto() {
        await this.page.goto('https://techhubecommerce.lovable.app/products');
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL(/products/);
        await expect(this.productContainer1).toBeVisible();
    }

    async assertAccesoriesFiltersCorrectlyApplied() {
        await expect(this.productContainer1).toBeVisible();
    }

    async openFilters() {
        await this.filtreButton.click();
    }

    async filterAccessories() {
        await this.filtreAccesories.click();
    }

    async filterUnder100() {
        await this.filtreMinus.click();
    }

    async clickProduct1() {
        await this.productContainer1.click();
    }

    async clickProduct2() {
        await this.productContainer2.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartButton.click(); 
    }

    async expectProduct1Visible() {
        await expect(this.productContainer1).toBeVisible();
    }
}
