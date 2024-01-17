Cypress.Commands.add('loadDatabaseDump', (dumpName) => {
    const command = 'docker exec shopmost-db pg_restore -h localhost -U postgres -d shopmost -F c -c -v ' + dumpName + '.pgdump' 
    cy.exec(command)
});