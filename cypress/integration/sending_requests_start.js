/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')

});

after(() => {
  // reset via api
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
});

it('Sending requests - POST', () => {

  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'board created by .request() command'
    }
  }).then((response) => {
    expect(response).property('status').to.equal(201)
    process.env.BOARD_ID = JSON.stringify(response.body.id)
  })

});

it('Sending requests GET', () => {

  cy.request({
    method: 'GET',
    url: `/api/boards/${process.env.BOARD_ID}`
  }).then((response) => {
    expect(response).property('status').to.equal(200)
  })

});

it('Sending requests - PATCH', () => {

  cy.request({
    method: 'PATCH',
    url: `/api/boards/${process.env.BOARD_ID}`,
    body: {
      name: 'UPDATED board created by .request() command'
    }
  }).then((response) => {
    expect(response).property('status').to.equal(200)
  })

});

it('Sending requests DELETE', () => {

  cy.request({
    method: 'DELETE',
    url: `/api/boards/${process.env.BOARD_ID}`
  }).then((response) => {
    expect(response).property('status').to.equal(200)
  })
});
