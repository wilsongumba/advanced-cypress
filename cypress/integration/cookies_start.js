/// <reference types="cypress" />

describe('Cookies', () => {

  before(() => {
    cy
      .visit('/')
    cy
      .get('[data-cy="login-menu"]')
      .click();

      cy.get(':nth-child(2) > .LoginModule_logSignSwitch > a').click();

      cy.get('[data-cy=signup-email]')
      .type('test@user.com');

    cy
      .get('[data-cy="signup-password"]')
      .type('pass1234');

    cy
      .get('[data-cy="signup"]')
      .click();
    cy.get('[id="loginMessage"]').should('be.visible');
    cy.get('[data-cy=logged-user]').click()
    cy.get('span').click();
    cy.get('[data-cy="login-menu"]').should('be.visible');
  })

  beforeEach(() => {
    cy
      .visit('/')
  })

  after(() => {
    cy.visit('/')
    cy.realPress(['F2'])
    cy.get('#tools > :nth-child(1)').click({ force: true })
  })

  it('test #1 - no cookie', () => {

    cy
      .get('[data-cy="login-menu"]')
      .click();

    cy
      .get('[data-cy="login-email"]')
      .type('test@user.com');

    cy
      .get('[data-cy="login-password"]')
      .type('pass1234');

    cy
      .get('[data-cy="login"]')
      .click();
    cy.get('[id="loginMessage"]').should('be.visible');

    // const cookie = cy.getCookie('trello_token').log()
    // //console.log("want some cookies? ", cookie);
    cy.getCookie('trello_token')
      .should('exist')
      .then((c) => {
        // save cookie until we need it
        process.env.TRELLO_TOKEN = c.value;
      })
  });

  it('test #2', () => {
    cy.setCookie("trello_token", process.env.TRELLO_TOKEN);
    cy.reload();
    cy.get('[id="loginMessage"]').should('be.visible');
  });
});
