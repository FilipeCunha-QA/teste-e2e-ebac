

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('buscarSelecionarAdicionarProduto', (nomeProduto, tamanho, cor) => {

  // 🔎 Buscar produto
  cy.get('#primary-menu > .menu-item-629 > a').click()
  cy.get('.search >').type(nomeProduto)
  cy.get('.search').find('.button-search').click()


  
  // 🎨 Selecionar tamanho
  cy.get('.button-variable-item-36')

  // 🎨 Selecionar cor
  cy.get('select[name="attribute_pa_cor"]')
    .should('be.visible')
    .select(cor)

  // 🛒 Adicionar ao carrinho
  cy.get('button.single_add_to_cart_button')
    .should('not.be.disabled')
    .click()

  // ✅ Validar mensagem de sucesso
  cy.contains('foi adicionado no seu carrinho')
    .should('be.visible')

})
