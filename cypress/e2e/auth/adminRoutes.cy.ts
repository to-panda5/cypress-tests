export {};

const baseUrl = Cypress.config('baseUrl');
const email = Cypress.env('ADMIN_EMAIL');
const password = Cypress.env('ADMIN_PASSWORD');

const protectedAdminRoutes = [
  '/admin',

  '/admin/products',
  '/admin/categories',
  '/admin/collections',
  '/admin/attributes',

  '/admin/orders',
  '/admin/customers',
  '/admin/coupons',
  '/admin/pages',

  '/admin/setting/store',
  '/admin/setting/payments',
  '/admin/setting/shipping',
  '/admin/setting/tax',
];

/**
 * Clear all cookies before every test (in case of using cy.authenticate()).
 */
beforeEach(() => {
  cy.clearAllCookies();
  cy.visit('/admin/login');
});

describe('Admin routes protection', () => {
  it('Prevents from accessing admin routes without logging in', () => {
    protectedAdminRoutes.forEach((route) => {
      cy.visit(route);
      cy.url().should('eq', `${baseUrl}/admin/login`);
    });
  });

  it('Allows admin to access protected routes after logging in', () => {
    cy.get('form#adminLoginForm input[name="email"]').type(email);
    cy.get('form#adminLoginForm input[name="password"]').type(password);
    cy.get('form#adminLoginForm button[type="submit"]').click();
    cy.url().should('eq', `${baseUrl}/admin`);

    protectedAdminRoutes.forEach((route) => {
      cy.visit(route);
      cy.url().should('eq', `${baseUrl}${route}`);
    });
  });
});
