describe('Display categories', () => {
    const baseUrl = Cypress.config('baseUrl');
    const adminEmail = Cypress.env('ADMIN_EMAIL')
    const adminPassword = Cypress.env('ADMIN_PASSWORD')

    it('empty list of categories', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
    });
    it('empty list of categories with category name filter', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
        cy.get('tr').find('th').eq(1).find('input').type('cos').type('{enter}')
        cy.get('.card').should('contain', 'There is no category to display')
    });
    it('empty list of categories with category status filter', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('.card').should('contain', 'There is no category to display')
    });
    it('empty list of categories with inlclude in menu filter', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
        cy.get('tr').find('th').eq(3).find('select').select('Yes')
        cy.get('tr').find('th').eq(3).find('select').should('contain.text', 'Yes')
        cy.get('.card').should('contain', 'There is no category to display')
    });
    it.only('empty list of categories with all filters', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
        cy.get('tr').find('th').eq(1).find('input').type('cos')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(3).find('select').select('Yes')
        cy.get('tr').find('th').eq(1).find('input').should('contain.text', 'cos')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('tr').find('th').eq(3).find('select').should('contain.text', 'Yes')
        cy.get('.card').should('contain', 'There is no category to display')
    });
});