it('testa a página da política de privacidade de forma independente',function(){
    cy.visit('./src/privacy.html')
    //cy.get('#title').should('contain','CAC TAT - Política de privacidade')
    // Resolução do professor
    cy.contains('Talking About Testing').should('be.visible')
})