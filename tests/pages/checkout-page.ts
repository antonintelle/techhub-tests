import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    // Navigation
    returnToCart: Locator;
    
    // Boutons principaux
    loginButton: Locator;
    continueToPaymentButton: Locator;
    
    // Champs formulaire livraison (data-testid identifiés)
    firstNameInput: Locator;
    lastNameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    addressInput: Locator;
    cityInput: Locator;
    postalCodeInput: Locator;

    // Champs formulaire paiement (data-testid identifiés)
    cardNumberInput: Locator;
    cardNameInput: Locator;
    expiryInput: Locator;
    cvvInput: Locator;
    payButton: Locator;
    
    // Récapitulatif
    totalPrice: Locator;
    paymentSuccess: Locator;

    constructor(private page: Page) {
        // Navigation
        this.returnToCart = page.getByTestId('checkout-back-to-cart-button');
        this.loginButton = page.getByTestId('checkout-login-button');
        
        // Boutons
        this.continueToPaymentButton = page.getByTestId('shipping-submit-button');
        
        // Formulaire livraison
        this.firstNameInput = page.getByTestId('shipping-firstname-input');
        this.lastNameInput = page.getByTestId('shipping-lastname-input');
        this.emailInput = page.getByTestId('shipping-email-input');
        this.phoneInput = page.getByTestId('shipping-phone-input');
        this.addressInput = page.getByTestId('shipping-address-input');
        this.cityInput = page.getByTestId('shipping-city-input');
        this.postalCodeInput = page.getByTestId('shipping-postalcode-input');

        // Formulaire paiement
        this.cardNumberInput = page.getByTestId('payment-cardnumber-input');
        this.cardNameInput = page.getByTestId('payment-cardname-input');
        this.expiryInput = page.getByTestId('payment-expiry-input');
        this.cvvInput = page.getByTestId('payment-cvv-input');
        this.payButton = page.getByTestId('payment-submit-button');
        
        // Récapitulatif
        this.totalPrice = page.locator('span.text-xl.font-bold:has-text("€")');
        this.paymentSuccess = page.getByRole('heading', { name: 'Commande confirmée !' });

    }

    async goto() {
        await this.page.goto('https://techhubecommerce.lovable.app/checkout');
    }

    // Actions navigation
    async goBackToCart() {
        await this.returnToCart.click();
    }

    async login() {
        await this.loginButton.click();
    }

    async continueToPayment() {
        await this.continueToPaymentButton.click();
    }

    // Remplissage formulaire livraison
    async fillShippingForm(firstName: string, lastName: string, email: string, 
                          phone: string, address: string, city: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.postalCodeInput.fill(postalCode);
    }

    // Assertions
    async verifyShippingFormVisible() {
        await expect(this.firstNameInput).toBeVisible();
    }

    async verifyTotalPrice(expectedTotal: string) {
        await expect(this.totalPrice).toContainText(expectedTotal);
    }

    async verifyProgressStep(stepName: string) {
        await expect(this.page.getByText(stepName)).toBeVisible();
    }

    async pay(cardNumber: string, cardName: string, expiry: string, cvv: string) {
        await this.cardNumberInput.fill(cardNumber);
        await this.cardNameInput.fill(cardName);
        await this.expiryInput.fill(expiry);
        await this.cvvInput.fill(cvv);
        await this.payButton.click();
    }

    async verifyPaymentFormVisible() {
        await expect(this.cardNumberInput).toBeVisible();
    }
}
