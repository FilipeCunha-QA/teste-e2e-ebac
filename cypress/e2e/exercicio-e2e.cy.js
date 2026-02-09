/// <reference types="cypress" />
import login from '../fixtures/perfil.json'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br/')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
       //Selecionar Primeiro produto
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
    cy.get('.button-variable-item-XL').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.single_add_to_cart_button').click()
    //Pesquisar e selecionar segundo produto
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.search > ').type('Ariel Roll Sleeve Sweatshirt')
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search').click()
    cy.get('.button-variable-item-XL').click()
    cy.get('.button-variable-item-Purple').click()
    cy.get('.single_add_to_cart_button').click()
    //Pesquisar e selecionar terceiro produto
    cy.get('.search > ').type('Vulcan Weightlifting Tank')
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search').click()
    cy.get('.button-variable-item-L').click()
    cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
    cy.get('.single_add_to_cart_button').click()
    //Pesquisar e selecionar quarto produto
    cy.get('.search > ').type('Geo Insulated Jogging Pant')
    cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search').click()
    cy.get('.button-variable-item-36').click()
    cy.get('.button-variable-item-Red').click()
    cy.get('.single_add_to_cart_button').click()
    
    //Selecionar o carrinho
    cy.get('.dropdown-toggle > .text-skin').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
    cy.get('.checkout-button').click()
    cy.get('.showlogin').click()
    cy.get('#username').type(login.usuario)
    cy.get('#password').clear().type(login.senha)
    cy.get('.woocommerce-button').click()
    //finalizar a compra
    cy.get('#terms').check({ force: true })
    cy.get('#place_order').click()
    cy.get('.page-title').should('exist')




      
});
   


})