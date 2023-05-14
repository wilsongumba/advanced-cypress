/// <reference types="cypress" />

beforeEach(() => {
  cy
    .visit('/');

  cy.get('[data-cy=create-board]').click();
  cy.get('[data-cy=new-board-input]').type("test board");
  cy.get('[data-cy=new-board-create]').click();
  cy.get('[data-cy=add-list]').click();
  cy.get('[data-cy=add-list-input]').type("test list");
  cy.get('[data-cy=save]').click();
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type("salt");
  cy.get('[data-cy=add-task]').click()
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type("milk");
  cy.get('[data-cy=add-task]').click();
})

it('Multiple assertions', () => {
  cy
    .get('[data-cy=task]')
    .eq(0)
    .should('contain.text', 'salt')

  cy
    .get('[data-cy=task]')
    .eq(1)
    .should('contain.text', 'milk')
})

it('Multiple assertions with should(has retries)', () => {
  cy
    .get('[data-cy=task]')
    .should(item => {
      console.log(item)
      if (item.length !== 2) {
        throw new Error('Not enough elements!')
      }
      expect(item[0]).to.contain.text('salt')
      expect(item[1]).to.contain.text('milk')
    })
})

it('Multiple assertions with then(has no retries)', () => {
  cy
    .get('[data-cy=task]')
    .then(item => {
      if (item.length !== 2) {
        throw new Error('Not enough elements!')
      }
      expect(item[0]).to.contain.text('salt')
      expect(item[1]).to.contain.text('milk')
    })
})
