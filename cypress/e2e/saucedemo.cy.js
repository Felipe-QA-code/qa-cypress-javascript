/// <reference types="cypress" />

describe('SauceDemo - Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('debería loguearse correctamente con credenciales válidas', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Verificamos que llegamos a la página de productos
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')
  })

  it('debería mostrar un error con credenciales inválidas', () => {
    cy.get('#user-name').type('usuario_invalido')
    cy.get('#password').type('clave_incorrecta')
    cy.get('#login-button').click()

    // Verificamos el mensaje de error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match')
  })

  it('debería mostrar error si el usuario está bloqueado', () => {
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', ' Sorry, this user has been locked out.')
  })

})