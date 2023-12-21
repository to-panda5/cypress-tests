describe('Display categories', () => {
    const baseUrl = Cypress.config('baseUrl');
    const adminEmail = Cypress.env('ADMIN_EMAIL')
    const adminPassword = Cypress.env('ADMIN_PASSWORD')

    it('go to categories', () => {
        cy.exec('docker exec shopmost-db pg_restore -h localhost -U postgres -d shopmost -F c -c -v plik_dumpu.pgdump')
        cy.visit('/admin/login')
        cy.location('pathname').should('eq', '/admin/login')
        cy.get("#adminLoginForm").get('input[name="email"]').type(adminEmail)
        cy.get("#adminLoginForm").get('input[name="password"]').type(adminPassword)
        cy.get('.button').click()
        cy.location('pathname').should('eq', '/admin')
        cy.get('.list-unstyled').contains('Categories').click()
        cy.location('pathname').should('eq', '/admin/categories')
    });
});