import { Locator, Page, expect } from "@playwright/test";

export class HomePage { 

    headerLogo: Locator;
    home: Locator;
    products: Locator;
    about: Locator;
    contact: Locator;
    search: Locator;
    cart: Locator;
    auth: Locator;
    discoverButton: Locator;
    aboutButton: Locator;
    accessoriesCat: Locator;
    smartHomeCat: Locator;
    gamingCat: Locator;
    officeCat: Locator;
    viewAll: Locator;
    productContainer: Locator;
    aboutText: Locator;

    constructor(private page: Page) {
        this.headerLogo = page.getByTestId('header-logo');
        this.home = page.getByTestId('nav-link-home');
        this.products = page.getByTestId('nav-link-products');
        this.about = page.getByTestId('nav-link-about');
        this.contact = page.getByTestId('nav-link-contact');
        this.search = page.getByTestId('search-button');
        this.cart = page.getByTestId('cart-link');
        this.auth = page.getByTestId('auth-link');
        this.discoverButton = page.getByTestId('hero-cta-button');
        this.aboutButton = page.getByTestId('hero-about-button');
        this.accessoriesCat = page.getByTestId('category-card-accessories');
        this.smartHomeCat = page.getByTestId('category-card-smart-home');
        this.gamingCat = page.getByTestId('category-card-gaming');
        this.officeCat = page.getByTestId('category-card-office');
        this.viewAll = page.getByTestId('view-all-products-button');
        this.productContainer = page.getByTestId('product-container-1');
        this.aboutText = page.getByText('Notre histoire');
    }

    async goto() {
        await this.page.goto(process.env.URL || 'https://techhubecommerce.lovable.app/');
    }

    async assertLoaded() {
        await expect(this.page).toHaveURL(/techhubecommerce\.lovable\.app\/$/);
        await expect(this.headerLogo).toBeVisible();
        await expect(this.discoverButton).toBeVisible();
    }

    async clickLogo() {
        await this.headerLogo.click();
    }

    async goToHome() {
        await this.home.click();
    }

    async goToCart() {
        await this.cart.click();
    }

    async goToProducts() {
        await this.products.click();
    }

    async goToAbout() {
        await this.about.click();
    }

    async goToContact() {
        await this.contact.click();
    }

    async openSearch() {
        await this.search.click();
    }

    async openCart() {
        await this.cart.click();
    }

    async goToAuth() {
        await this.auth.click();
    }

    async discoverProducts() {
        await this.discoverButton.click();
    }

    async learnAbout() {
        await this.aboutButton.click();
    }

    async clickAccessories() {
        await this.accessoriesCat.click();
    }

    async clickSmartHome() {
        await this.smartHomeCat.click();
    }

    async clickGaming() {
        await this.gamingCat.click();
    }

    async clickOffice() {
        await this.officeCat.click();
    }

    async viewAllProducts() {
        await this.viewAll.click();
    }

    async clickFirstProduct() {
        await this.productContainer.click();
    }
}
