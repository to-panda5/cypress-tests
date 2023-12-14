type GetCustomersResponse = {
  data: {
    customers: {
      items: {
        uuid: string;
        fullName: string;
        email: string;
      }[];
    };
  };
};

declare namespace Cypress {
  interface Chainable {
    authenticate: () => Chainable<Response<void>>;
    getCustomers: () => Chainable<Response<GetCustomersResponse>>;
    getCustomersByEmail: (
      email: string,
    ) => Chainable<Response<GetCustomersResponse>>;
    deleteCustomer: (uuid: string) => Chainable<Response<void>>;
  }
}
