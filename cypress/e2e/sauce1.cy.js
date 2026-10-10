/// <reference types="cypress" /> 

it('login con credenciales validas' , () => {
    cy.visit('https://www.saucedemo.com')
    
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    cy.get('[data-test="inventory-list"]').should('be.visible');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('#add-to-cart-sauce-labs-bike-light').click();
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include','https://www.saucedemo.com/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 2)
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include','https://www.saucedemo.com/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('felipe');
    cy.get('[data-test="lastName"]').type('perez');
    cy.get('[data-test="postalCode"]').type('1234')
    cy.get('[data-test="continue"]').click();
    cy.url().should('include','https://www.saucedemo.com/checkout-step-two.html')
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/checkout-complete.html')
    cy.get('[data-test="complete-header"]').should('be.visible')

})