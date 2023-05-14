/// <reference types="cypress" />

beforeEach(() => {

  cy
    .visit('/')
})

it('Chaining commands', () => {
  cy.get('[data-cy=create-board]').click();
  cy.get('[data-cy=new-board-input]').type("test board");
  cy.get('[data-cy=new-board-create]').click();
  cy.get('[data-cy=add-list]').click();
  cy.get('[data-cy=add-list-input]').type("test list");
  cy.get('[data-cy=save]').click();
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type("milk");
  cy.get('[data-cy=add-task]').click()
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type("salt");
  cy.get('[data-cy=add-task]').click();
  cy.contains('milk')

  cy
    .get('[data-cy=list]')
    .eq(0)
    .contains('milk')
});
