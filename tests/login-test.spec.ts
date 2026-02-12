// tests/auth-login.spec.ts
import { test, expect } from './pages/fixture';
import { faker } from '@faker-js/faker';

test('login with existing account', async ({ authPage, page }) => {
  const email = process.env.EMAIL ||'user@test.com';
  const password = process.env.PASSWORD  ||'Password123!';

  await authPage.goto();
  await authPage.login(email, password);

  await expect(authPage.loginSuccess).toBeVisible();
});

test('signup with Faker', async ({ authPage, page }) => {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 12 });

  await authPage.goto();
  await authPage.signup(name, email, password);

  await expect(authPage.signupSuccess).toBeVisible();
});

