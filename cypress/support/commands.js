/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

Cypress.Commands.add('PreencherCadastro', () => {
let email = faker.internet.email()
let nome = faker.person.fullName()
let senha = faker.internet.password()
cy.get('#name').type(nome)
cy.get('#email').type(email)
cy.get('#password').type(senha)
cy.get('#confirm-password').type(senha)
cy.get('#terms-agreement').click()
cy.get('#register-btn').click()

})
