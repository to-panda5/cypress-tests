describe('Display categories', () => {
    const baseUrl = Cypress.config('baseUrl');
    const adminEmail = Cypress.env('ADMIN_EMAIL')
    const adminPassword = Cypress.env('ADMIN_PASSWORD')

    it('empty list of categories', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
    });
});