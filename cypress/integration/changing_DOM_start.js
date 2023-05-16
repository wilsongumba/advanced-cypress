/// <reference types="cypress" />

beforeEach(() => {

  cy
    .visit('/');
  cy.get('[data-cy=create-board]').click();
  cy.get('[data-cy=new-board-input]').type("test board");
  cy.get('[data-cy=new-board-create]').click();

});

afterEach(() => {
  cy.realPress(['F2'])
  cy.get('#tools > :nth-child(1)').click({ force: true })
})

it('Changing the DOM - force', () => {
  cy.get('.Nav_boards').click();
  cy
    .get('[data-cy="star"]').click({ force: true });
})

it('Changing the DOM - invoke', () => {
  cy.get('.Nav_boards').click();
  cy
    .get('[data-cy="star"]').invoke('show').click();

})

it('Changing the DOM - addClass', () => {
  cy.get('[data-cy=add-list]').click();
  cy.get('[data-cy=add-list-input]').type("test list");
  cy.get('[data-cy=save]').click();
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type("salt");
  cy.get('[data-cy=add-task]').click()
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type("milk");
  cy.get('[data-cy=add-task]').click();
  cy.get('[data-cy=task]').eq(0).invoke('addClass', 'overDue')
})

it('Changing the DOM - trigger event', () => {
  cy.get('.Nav_boards').click();
  cy.get('[data-cy="board-item"]').trigger('mouseover');
  cy.get('[data-cy="star"]').should('be.visible');

  cy.get('[data-cy="board-item"]').trigger('mouseout');
  cy.get('[data-cy="star"]').should('not.be.visible');
})