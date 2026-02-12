// tests/fixtures.ts
import { test as base } from '@playwright/test';
import { HomePage } from './home-page';
import { ProductsPage } from './products-page';
import { CartPage } from './cart-page';
import { CheckoutPage } from './checkout-page';
import { AuthPage } from './auth-page';

type Pages = {
  homePage: HomePage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authPage: AuthPage;
};

const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);
  },
});

const expect = base.expect;

export { test, expect };