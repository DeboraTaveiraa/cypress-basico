// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

const LONG_TEXT = "Lorem fugiat eu consequat ipsum Lorem. Labore ad incididunt incididunt aliqua aute id Lorem adipisicing eu labore eu. Ipsum amet incididunt tempor sunt ipsum amet anim dolore nulla duis adipisicing sit occaecat. Tempor qui exercitation fugiat eu elit. Esse cupidatat ex ad ipsum id consectetur.";

describe('Central de Atendimentos ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('TESTE');

    cy.get('#lastName').type('TESTE');

    cy.get('#email').type('teste@exemplo.com');

    cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 });

    cy.contains('button', 'Enviar').click();
    // cy.get('button[type=submit]').click();

    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('TESTE');

    cy.get('#lastName').type('TESTE');

    cy.get('#email').type('teste-exemplo.com');

    cy.contains('button', 'Enviar').click();
    // cy.get('button[type=submit]').click();

    cy.get('.error').should('be.visible');
  });

  it('validar campo de telefone', () => {
    cy.get('#phone').type('TESTE').should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('TESTE');

    cy.get('#lastName').type('TESTE');

    cy.get('#email').type('teste-exemplo.com');

    cy.get('#phone-checkbox').click();

    cy.contains('button', 'Enviar').click();
    // cy.get('button[type=submit]').click();

    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {    
    cy.get('#firstName')
      .type('TESTE')
      .should('have.value', 'TESTE')
      .clear()
      .should('have.value', '');

    cy.get('#lastName')
      .type('TESTE')
      .should('have.value', 'TESTE')
      .clear()
      .should('have.value', '');

    cy.get('#email')
      .type('teste-exemplo.com')
      .should('have.value', 'teste-exemplo.com')
      .clear()
      .should('have.value', '');

    cy.get('#phone')
      .type('000000000000')
      .should('have.value', '000000000000')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    // cy.get('button[type=submit]').click();

    cy.get('.error').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  });
});