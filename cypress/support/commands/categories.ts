Cypress.Commands.add('goToCategories', (login, password) => {
    cy.visit('/admin/login')
    cy.location('pathname').should('eq', '/admin/login')
    cy.get("#adminLoginForm").get('input[name="email"]').type(login)
    cy.get("#adminLoginForm").get('input[name="password"]').type(password)
    cy.get('.button').click()
    cy.location('pathname').should('eq', '/admin')
    cy.get('.list-unstyled').contains('Categories').click()
    cy.location('pathname').should('eq', '/admin/categories')
});  