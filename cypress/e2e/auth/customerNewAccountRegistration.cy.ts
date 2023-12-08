const generateCustomerData = () => ({
  fullName: 'John Doe',
  email: `johndoe@mail.com`,
  password: 'zaq1@WSX',
});

describe('Customer new account registration', () => {
  const customer = generateCustomerData();

  it('Registers new customer account', () => {
    cy.visit('http://localhost:3000/account/register');

    cy.get('.register-form input[name="full_name"]').type(customer.fullName);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form input[name="password"]').type(customer.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', 'http://localhost:3000/account/register');
    cy.get('a[href="/account').click();

    cy.get('.account-details-name').should('contain', customer.fullName);
    cy.get('.account-details-email').should('contain', customer.email);
  });

  it('Prevents from registering new customer account with existing email', () => {
    cy.visit('http://localhost:3000/account/register');

    cy.get('.register-form input[name="full_name"]').type(customer.fullName);
    cy.get('.register-form input[name="email"]').type(customer.email);
    cy.get('.register-form input[name="password"]').type(customer.password);
    cy.get('.register-form button[type="button"]').click();

    cy.url().should('eq', 'http://localhost:3000/account/register');
    cy.get('.register-form .text-critical').should(
      'contain',
      'duplicate key value violates unique constraint "EMAIL_UNIQUE"',
    );
  });
});

const adminLogin = () =>
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/user/sessions',
    body: {
      email: 'admin@mail.com',
      password: 'zaq1@WSX',
    },
  });

const fetchUsers = () =>
  cy.request({
    method: 'GET',
    url: 'http://localhost:3000/admin/customers',
  });

after(() => {
  adminLogin().then(() => {
    fetchUsers().then((response) => {
      const html = response.body as string;
      const regex = /<script>var eContext = (.*)<\/script>/g;
      const matches = html.matchAll(regex);
      const match = Array.from(matches)[0];

      if (match?.[1]) {
        const data = JSON.parse(match[1]);

        const graphqlResponse = data['graphqlResponse'];
        const propsMap = data['propsMap'];

        let alias = '';
        for (const [_, value] of Object.entries(propsMap)) {
          if (value?.[0]?.['origin'] === 'customers') {
            alias = value[0]['alias'];
          }
        }

        if (alias) {
          const customers = graphqlResponse[alias]['items'];
          for (const customer of customers) {
            console.log(customer);
            cy.request({
              method: 'DELETE',
              url: `http://localhost:3000/api/customers/${customer.uuid}`,
            });
          }
        }
      }
    });
  });
});
