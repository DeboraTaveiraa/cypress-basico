describe('Search google', () => {
  const searchTerm = 'vuejs';

  beforeEach(() => {
    cy.intercept(
      'GET',
      `**?q=${searchTerm}**`
    ).as('getSearchResults')

    cy.visit('https://google.com')

    cy.get('textarea')
      .as('searchField')
      .should('be.visible')
  })

  // precisa corrigir o erro desse comando ocorrendo na versão 9.5 do Cypress
  it('types and click ENTER', () => {
    cy.get('@searchField')
      .type(`${searchTerm}{enter}`)
  })
})