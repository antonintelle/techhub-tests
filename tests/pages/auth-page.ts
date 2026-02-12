import { expect, Locator, Page } from "@playwright/test";

export class AuthPage { 

    loginButton: Locator;
    signupButton: Locator;
    signupName: Locator;
    signupEmail: Locator;
    signupPassword: Locator;
    signupConfirmPassword: Locator;
    signupSubmit: Locator;
    loginEmail: Locator;
    loginPassword: Locator;
    loginSubmit: Locator;

    loginSuccess: Locator;
    signupSuccess: Locator;


    constructor(private page: Page) {
        this.loginButton = page.getByTestId('login-tab');
        this.signupButton = page.getByTestId('signup-tab');
        this.signupName = page.getByTestId('signup-name-input');
        this.signupEmail = page.getByTestId('signup-email-input');
        this.signupPassword = page.getByTestId('signup-password-input');
        this.signupConfirmPassword = page.getByTestId('signup-confirm-password-input');
        this.signupSubmit = page.getByTestId('signup-submit-button');

        this.loginEmail = page.getByTestId('login-email-input');
        this.loginPassword = page.getByTestId('login-password-input');
        this.loginSubmit = page.getByTestId('login-submit-button');

        this.loginSuccess = page.getByRole('status').filter({ hasText: 'Connexion réussie' });
        this.signupSuccess = page.getByRole('status').filter({ hasText: 'Inscription réussie !' });
    }

    async goto() {
        await this.page.goto('https://techhubecommerce.lovable.app/auth');
    }

    async login(email: string, password: string) {
        await this.loginButton.click();
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginSubmit.click();
    }

    async signup(name: string, email: string, password: string) {
        await this.signupButton.click();
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupPassword.fill(password);
        await this.signupConfirmPassword.fill(password);
        await this.signupSubmit.click();
    }

}