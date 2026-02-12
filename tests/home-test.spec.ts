import { test, expect } from "./pages/fixture";

test.beforeEach(async ({ homePage }) => {
    await homePage.goto(); 
});  

test('Home page is loaded correctly', async ({ homePage }) => {
    await homePage.assertLoaded(); 
}); 
    
    
test('Navigation from Home to Products', async ({ homePage, productsPage }) => { 
    await homePage.goToProducts(); 
    await productsPage.assertLoaded(); 
});

test('Discover products from Home', async ({ homePage, productsPage }) => {
    await homePage.discoverProducts(); 
    await productsPage.assertLoaded(); 
});

test('Learn about us from Home', async ({ homePage }) => {
    await homePage.learnAbout();   
    await expect(homePage.aboutText).toBeVisible();
});

test('Navigation to Accessories category', async ({ homePage, productsPage }) => {
    await homePage.clickAccessories();
    await productsPage.assertAccesoriesFiltersCorrectlyApplied();
});
