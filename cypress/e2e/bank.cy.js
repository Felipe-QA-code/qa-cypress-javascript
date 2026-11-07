/// <reference types="cypress" />

describe('Finanzas', () => {

    beforeEach(() => {
        cy.session('logearse', () => {
              cy.visit('https://parabank.parasoft.com/parabank/index.htm');
            cy.get('input[name="username"]').type('john');
            cy.get('input[name="password"]').type('demo');
            cy.get('input[value="Log In"]').click();
            cy.contains('Accounts Overview').should('be.visible'); 
        }, {
            validate() {
                cy.request({
                    url: 'https://parabank.parasoft.com/parabank/overview.htm',
                    followRedirect: false
                }).its('status').should('eq', 200);
        }
    });
    
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    });

    it('validar monto', () => {
        cy.get('#leftPanel a[href="overview.htm"]').click();
        cy.get('#accountTable').should('be.visible');
        cy.get('#accountTable th').should('have.length', 3);
        cy.get('#accountTable th').eq(0).should('have.text', 'Account');
        cy.get('#accountTable th').eq(1).should('have.text', 'Balance*');
        cy.get('#accountTable th').eq(2).should('have.text', 'Available Amount');
        let total = 0
        cy.get('#accountTable tbody tr:not(:last-child) td:nth-child(2)').each((fila)=>{
            total += Number(fila.text().replace(/[$,]/g, ''))
            }).then(()=>{
                cy.log('TOTAL:, ${total.toFixed(2)}')
        });
        cy.get('#accountTable tbody tr:last-child td:nth-child(2)').then((balancetotal) => {
            const Balance = Number(balancetotal.text().replace(/[$,]/g, ''))
            expect(Number(total.toFixed(2))).to.equal(Balance)
        });    
    });

    it('transferir efectivo', () => {
        cy.get('a[href="transfer.htm"]').click();
        cy.url().should('include', '/transfer.htm');
        cy.get('#transferForm').should('be.visible');
        cy.get('#amount').type('100'); 
        cy.get('#fromAccountId').select(0);
        cy.get('#fromAccountId').should('have.value', '12345')
        cy.get('#toAccountId').select(1);
        cy.get('#toAccountId').should('have.value', '12456')
        cy.get('input.button').click();
        cy.contains('Transfer Complete!').should('be.visible');
        cy.get('#amountResult').should('contain', '100');
        cy.get('#amountResult').then((monto)=>{
           cy.log(`TRANSFERENCIA:, ${monto.text()}`)
        })
    });

    it('validar transferencia', () => {
        cy.get('a[href="overview.htm"]').click();
        // vamos a la cuenta de origen 
        cy.get('a[href="activity.htm?id=12345"]').click()
        // otra forma de encontrar el enlace
        // cy.get('a[href*="id=12345"]').click() otra forma
        cy.get('#transactionTable').should('be.visible');
    });
});
