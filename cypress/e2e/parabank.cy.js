/// <reference types="cypress"/>

describe('Finanzas', () =>{beforeEach(() => {cy.visit('https://parabank.parasoft.com/parabank/index.htm')})

it('parabank', () =>{

const username = `felipe${Date.now()}`;

cy.contains('Register').click();
cy.url().should('include', '/register.htm')
cy.get('.form2').should('be.visible');
cy.get('[id="customer.firstName"]').type('Felipe');
cy.get('[id="customer.lastName"]').type('Perez');
cy.get('[id="customer.address.street"]').type('blancoGalindo');
cy.get('[name="customer.address.city"]').type('cochabamba');
cy.get('[id="customer.address.state"]').type('Bolivia');
cy.get('[id="customer.address.zipCode"]').type('12334');
cy.get('[id="customer.phoneNumber"]').type('67452558');
cy.get('[id="customer.ssn"]').type('123');
cy.get('[id="customer.username"]').type(username);
cy.get('[id="customer.password"]').type('1234');
cy.get('#repeatedPassword').type('1234');
cy.get('tr input[type="submit"]').click();
cy.contains('Your account was created successfully')
.should('be.visible');
cy.get('#leftPanel').should('be.visible');
cy.get('ul li a').eq(2).click();
cy.get('#accountTable').should('be.visible');
cy.get('tbody tr').eq(2).should('be.visible').and('have.text', '$515.50');
});

});