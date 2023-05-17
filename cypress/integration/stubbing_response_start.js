/// <reference types="cypress" />

afterEach(() => {
  // reset via api
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
});

it('Stubbing response - inline', () => {

  cy
    .intercept({
      method: 'GET',
      url: '/api/boards'
    }, {
      body: [{
        "created": "2021-03-17",
        "id": 4564343889,
        "name": "stubbed board",
        "starred": false,
        "user": 0
      }]
    }).as('boardList')

  cy
    .visit('/')
  cy.wait('@boardList')
});

it('Stubbing response - from file(fixture)', () => {

  cy
    .intercept({
      method: 'GET',
      url: '/api/boards'
    }, { fixture: 'threeBoards.json' }).as('boardList')

  cy
    .visit('/')
  cy.wait('@boardList')
});

it('Stubbing response - force network error', () => {

  cy
    .intercept({
      method: 'GET',
      url: '/api/boards'
    }, { forceNetworkError: true }).as('boardList')
  cy
    .visit('/')
  cy.wait('@boardList')


  cy
    .get('[data-cy=create-board]')
    .click()

  cy
    .get('[data-cy=new-board-input]')
    .type('new board{enter}')

  cy.get('[data-cy=add-list]').click();
  cy.get('[data-cy=add-list-input]').type("test list");
  cy.get('[data-cy=save]').click();

  cy
    .get('#errorMessage')
    .should('be.visible')
});

it('Stubbing response - changing data', () => {

  cy
    .intercept({
      method: 'GET',
      url: '/api/boards'
    }, (req) => {
      req.reply((res) => {
        res.body[0].starred = true
        return res
      })
    }).as('boardList')

  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'board 1'
    }
  })

  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'board 2'
    }
  })

  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'board 3'
    }
  })

  cy
    .visit('/')
  cy.wait('@boardList')

});
