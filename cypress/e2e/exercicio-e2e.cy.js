/// <reference types="cypress" />

import login from '../fixtures/perfil.json'
import '../support/commands'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

  beforeEach(() => {
    cy.visit('/minha-conta')
    cy.login(login.usuario, login.senha)
    cy.visit('/')
  })

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

    cy.fixture('produtos').then((produtos) => {

      cy.wrap(produtos).each((produto) => {

        // Ir para página de produtos
        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Buscar produto
        cy.get('.search input[name="s"]')
          .clear()
          .type(produto.nome)

        cy.get('.search').within(() => {
          cy.get('button[type="submit"]').click()
        })

        // Selecionar produto
        cy.contains('.product', produto.nome)
          .click()

        // Selecionar variações
        cy.get(`.button-variable-item-${produto.tamanho}`).click()
        cy.get(`.button-variable-item-${produto.cor}`).click()

        // Adicionar ao carrinho
        cy.get('.single_add_to_cart_button').click()

        cy.contains('foi adicionado no seu carrinho')
          .should('be.visible')

      })

      // Ir para carrinho
      cy.visit('/carrinho')

      // Checkout
      cy.get('.checkout-button').click()

      // Selecionar pagamento
      cy.get('#payment_method_bacs').click()

      // Aceitar termos
      cy.get('#terms').click()

      // Finalizar pedido
      cy.get('#place_order').click()

      // Validar confirmação
      cy.contains('Obrigado. Seu pedido foi recebido.', { timeout: 10000 })
        .should('be.visible')

    })

  })

})
