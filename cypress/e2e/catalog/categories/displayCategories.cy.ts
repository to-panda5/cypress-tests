describe('Display categories', () => {
    it('go to categories', () => {
        cy.visit('http://localhost:3000/admin/categories')
        cy.location('pathname').should('eq', '/admin/login')
        cy.get("#adminLoginForm").get('input[name="email"]').type('jan.kowalski@gmail.com')
        cy.get("#adminLoginForm").get('input[name="password"]').type('KG123456')
        cy.get('.button').click()
        cy.location('pathname').should('eq', '/admin')
        cy.visit('http://localhost:3000/admin/categories')
        cy.location('pathname').should('eq', '/admin/categories')
    });
});