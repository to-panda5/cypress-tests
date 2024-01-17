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
    it('empty list of categories with all filters', () => {
        cy.loadDatabaseDump('empty_categories_dump')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.card').should('contain', 'There is no category to display')
        cy.get('tr').find('th').eq(1).find('input').type('cos')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(3).find('select').select('Yes')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'cos')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('tr').find('th').eq(3).find('select').should('contain.text', 'Yes')
        cy.get('.card').should('contain', 'There is no category to display')
    });

    it('Display category list with existing phrase in category name filter', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(1).find('input').type('category1').type('{enter}')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'category1')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category1')
    });

    it('Display category list with not existing phrase in category name filter', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(1).find('input').type('category3').type('{enter}')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'category3')
        cy.get('.listing > tbody').find('tr').should('have.length', 1)
        cy.get('.card').should('contain', 'There is no category to display')
    });

    it('Display category list with existing enabled status', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
    });

    it('Display category list with existing disabled status', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(2).find('select').select('Disabled')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Disabled')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category1')
    });

    it('Display category list with not existing enabled status', () => {
        cy.loadDatabaseDump('one_category')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('.listing > tbody').find('tr').should('have.length', 1)
        cy.get('.card').should('contain', 'There is no category to display')
    });

    it('Display category list with not existing disabled status', () => {
        cy.loadDatabaseDump('one_category_enabled_yes')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(2).find('select').select('Disabled')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Disabled')
        cy.get('.listing > tbody').find('tr').should('have.length', 1)
        cy.get('.card').should('contain', 'There is no category to display')
    });

    it('Display category list with not existing phrase in name and enable status filter', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(1).find('input').type('category3')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'category3')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('.listing > tbody').find('tr').should('have.length', 1)
        cy.get('.card').should('contain', 'There is no category to display')
    });

    it('Display category list with existing phrase in name and disable status filter', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(1).find('input').type('category1')
        cy.get('tr').find('th').eq(2).find('select').select('Disabled')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'category1')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Disabled')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category1')
    });

    it('Display category list with existing phrase in name and yes in include in menu filter', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(1).find('input').type('category2')
        cy.get('tr').find('th').eq(3).find('select').select('Yes')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'category2')
        cy.get('tr').find('th').eq(3).find('select').should('contain.text', 'Yes')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
    });

    it('Display category list with enable status filter and yes in include in menu filter', () => {
        cy.loadDatabaseDump('two_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 3)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(3).find('select').select('Yes')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('tr').find('th').eq(3).find('select').should('contain.text', 'Yes')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'category2')
    });

    it.only('Display category list with existing phrase in name filter and enable status filter and no in include in menu filter    ', () => {
        cy.loadDatabaseDump('eight_categories')
        cy.goToCategories(adminEmail, adminPassword)
        cy.get('.listing > tbody').find('tr').should('have.length', 9)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'cos4')
        cy.get('.listing > tbody').find('tr').eq(2).find('td').eq(1).should('have.text', 'cos3')
        cy.get('.listing > tbody').find('tr').eq(3).find('td').eq(1).should('have.text', 'cos2')
        cy.get('.listing > tbody').find('tr').eq(4).find('td').eq(1).should('have.text', 'cos1')
        cy.get('.listing > tbody').find('tr').eq(5).find('td').eq(1).should('have.text', 'category4')
        cy.get('.listing > tbody').find('tr').eq(6).find('td').eq(1).should('have.text', 'category3')
        cy.get('.listing > tbody').find('tr').eq(7).find('td').eq(1).should('have.text', 'category2')
        cy.get('.listing > tbody').find('tr').eq(8).find('td').eq(1).should('have.text', 'category1')
        cy.get('tr').find('th').eq(1).find('input').type('cos')
        cy.get('tr').find('th').eq(2).find('select').select('Enabled')
        cy.get('tr').find('th').eq(3).find('select').select('No')
        cy.get('tr').find('th').eq(1).find('input').should('have.value', 'cos')
        cy.get('tr').find('th').eq(2).find('select').should('contain.text', 'Enabled')
        cy.get('tr').find('th').eq(3).find('select').should('contain.text', 'No')
        cy.get('.listing > tbody').find('tr').should('have.length', 2)
        cy.get('.listing > tbody').find('tr').eq(1).find('td').eq(1).should('have.text', 'cos3')
    });
});