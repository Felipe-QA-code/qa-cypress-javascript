/// <reference types = "cypress" />

describe('internet', () => {beforeEach(() => {cy.visit('https://the-internet.herokuapp.com/')})
    
it ('primero', async ()=> {

    cy.get('.heading').should('be.visible').and('have.text','Welcome to the-internet');
    cy.get('ul li a').should('be.visible').eq(0).click()
    cy.url().should('include', '/abtest');
    cy.get('.example p').should('be.visible')
    })


it('segundo de the internet', ()=>{

    cy.get('ul li a').eq(1).click();
    cy.url().should('include', '/add_remove_elements');
    cy.contains('button', 'Add Element').click()
    cy.contains('button', 'Add Element').click();
    cy.contains('button', 'Add Element').click();
    cy.get('.added-manually').should('have.length', 3);
    })


it('Basic Auth', ()=>{

    cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    cy.get('.example').should('be.visible');
    cy.get('.example').should('contain.text', 'Congratulations');
    })

it('Broken Images', () =>{

    cy.get('ul li a').eq(3).click();
    cy.url().should('include','/broken_images');
    cy.get('.example').should('be.visible');
    cy.get('.example img').should('have.length', 3 );
    })

it('Challenging DOM', () => {

    cy.get('ul li a').eq(4).click();
    cy.url().should('include', '/challenging_dom')
    cy.get('.large-2.columns').should('be.visible');
    cy.get('.large-2.columns a').eq(0).click();
    cy.get('.large-2.columns a').eq(1).click();
    cy.get('.large-2.columns a').eq(2).click();
    cy.get('#canvas').then((canvasInicial)=> {
      const canvsInicial = canvasInicial[0].toDataURL();
    cy.get('.large-2.columns a').eq(0).click();
    cy.get('#canvas').then((canvasFinal) => {
      const canvsFinal = canvasFinal[0].toDataURL();
    expect(canvsInicial).not.to.eq(canvsFinal);
    });
    });
    });

it('Checkboxes' , ()=> {

    cy.get('ul li a').eq(5).click();
    cy.url().should('include','/checkboxes');
    cy.get('#checkboxes').should('be.visible');
    cy.get('#checkboxes input[type="checkbox"]').should('have.length', 2);
    cy.get('#checkboxes input').first().click().should('be.checked');
    cy.get('#checkboxes input').eq(1).click().should('not.be.checked');
    });

  it('Valida el context menu', () => {

    cy.get('ul li a').eq(6).click();
    cy.url().should('include', '/context_menu');
    cy.get('#hot-spot').should('be.visible');
    cy.get('#hot-spot').rightclick();
    cy.on('windows:alert', (text)=>{
      expect(text).contain('You selected a context menu')
    });
    });

  it('Disappearing Elements', () => {
    cy.get('ul li a').eq(8).click();
    cy.url().should('include', '/disappearing_elements')
    cy.get('ul li').should('be.visible');
    cy.get('ul li a').eq(0).click();
  });

  it('Drag and Drop', () => {
    cy.get('ul li a').eq(9).click();
    const dataTransfer = new DataTransfer()
    cy.get('#column-a').trigger('dragstart', {dataTransfer})
    cy.get('#column-b').trigger('drop', {dataTransfer})
    cy.get('#column-a').trigger('dragend')
    cy.get('#column-b').trigger('dragstart', {dataTransfer})
    cy.get('#column-a').trigger('drop', {dataTransfer})
    cy.get('#column-b').trigger('dragend')
  });

  it('Dropdown', () => {
    cy.get('ul li a').eq(10).click();
    cy.get('#dropdown').select('Option 1')
    cy.get('#dropdown').select('Option 2')
  });
  

    });


