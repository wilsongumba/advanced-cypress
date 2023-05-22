/// <reference types="cypress" />
let boardId = '';
beforeEach(() => {
  cy.visit('/')

});

afterEach(() => {
  // reset via api
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
});


it('Custom commands - method', () => {
  cy
    .visit('/`');
  cy.addBoard('new board')
});

it('Custom commands - selector', () => {

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
      .visit(`/board/4564343889`);

  cy
    .take('list')
    .eq(0)
    .take('task')
});
