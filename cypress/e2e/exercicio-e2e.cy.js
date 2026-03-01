/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import {  } from '../support/commands'
import catalogo from "../fixtures/catalogo.json"

describe('Deve fazer teste e2e', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    
  });

  it('Deve fazer cadastro completo', () => {
   //Cadastrar o usuario usando o faker
    let email = faker.internet.email()
    let nome = faker.person.fullName()
    let senha = faker.internet.password()
    cy.visit('/register.html')
    cy.PreencherCadastro(nome, email, senha)
    cy.url('should', 'dashboard')
    //Buscar produtos e colocar na cesta
    cy.get('.d-grid > .btn-primary').click()
    cy.get('#search-input').clear().type(catalogo[0].livro)
    cy.contains('button', 'Adicionar à Cesta').click()
    cy.get('#search-input').clear().type(catalogo[1].livro)
    cy.contains('button', 'Adicionar à Cesta').click()
    cy.get('#search-input').clear().type(catalogo[2].livro)
    cy.contains('button', 'Adicionar à Cesta').click()
    cy.get('#search-input').clear().type(catalogo[3].livro)
    cy.contains('button', 'Adicionar à Cesta').click()
    //
    cy.get(':nth-child(2) > .nav-link').click()
    cy.get('#checkout-btn').click()
    cy.get('#terms-agreement').click()
    cy.get('#confirm-reservations-btn').click()
    cy.get('.confirmation-card').should('contain','Reservas Confirmadas!')
})

});