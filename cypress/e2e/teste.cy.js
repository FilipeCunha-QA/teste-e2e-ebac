import login from '../fixtures/perfil.json'
describe('Pedido com sucesso', () => {

 beforeEach(() => {
    cy.visit('/minha-conta') // precisa estar na página de login
    cy.login('aluno_ebac@teste.com', 'teste@teste.com')
    cy.visit ('http://lojaebac.ebaconline.art.br/')
})

it('Deve buscar múltiplos produtos usando a massa de dados', () => {

  cy.fixture('produtos').then((produtos) => {

    expect(produtos).to.be.an('array')

    cy.wrap(produtos).each((produto) => {

      cy.get('#primary-menu > .menu-item-629 > a').click()

      cy.get('.search input[name="s"]')
        .clear()
        .type(produto.nome)

     cy.get('.search').within(() => {
  cy.get('button[type="submit"]').click()
})


      cy.get('.product')
        .contains(produto.nome)
        .should('be.visible')
        .click()

    
      cy.get(`.button-variable-item-${produto.tamanho}`).click()
      cy.get(`.button-variable-item-${produto.cor}`).click()

      cy.get('.single_add_to_cart_button').click()

      cy.contains('foi adicionado no seu carrinho')
        .should('be.visible')      
    })
    
  })

})

it('Deve finalizar a comprar e confirma-la', () => {
 // Ir para carrinho
cy.visit('/carrinho')

// Ir para checkout
cy.get('.checkout-button').click()

// Selecionar pagamento
cy.get('#payment_method_bacs').click()

// Finalizar
cy.get('#terms').click()
cy.get('#place_order').click()

// Validar
cy.contains('Obrigado. Seu pedido foi recebido.', { timeout: 10000 })
  .should('be.visible')

});

})
