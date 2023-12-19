declare namespace Cypress {
  interface Chainable {
    authenticate: () => Chainable<Response<void>>;

    getCustomers: () => Chainable<Response<GetCustomersResponse>>;
    getCustomersByEmail: (
      email: string,
    ) => Chainable<Response<GetCustomersResponse>>;
    createCustomer: (body: {
      full_name: string;
      email: string;
      password: string;
    }) => Chainable<Response<void>>;
    updateCustomer: (uuid: string, body: any) => Chainable<Response<void>>;
    updateCustomerByEmail: (
      email: string,
      body: any,
    ) => Chainable<Response<void>>;
    deleteCustomer: (uuid: string) => Chainable<Response<void>>;
    deleteCustomerByEmail: (email: string) => Chainable<Response<void>>;
  }
}

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
