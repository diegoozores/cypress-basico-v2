/// <reference types="Cypress" />

describe ('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        // o # significa que é um Id
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Ozores')
        cy.get('#email').type('email@teste.com.br')
        //cy.get('#open-text-area').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', {delay: 10})

        // Resolução do professor é criar uma variável para armazenar o texto acima
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        // Posteriormente informar essa variável no type, em vez do texto corrido
        cy.get('#open-text-area').type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click()
        // identificando o button com cy.contains em vez de cy.get
        cy.contains('button','Enviar').click()
        // o . significa que é uma classe
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Ozores')
        cy.get('#email').type('diego')
        //cy.get('button[type="submit"]').click()
        // identificando o button com cy.contains em vez de cy.get
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone permanece vazio quando informado valor não numérico', function(){
        cy.get('#phone').type('abcdef').should('have.value','')
        // Resolução do professor organiza melhor o código
        //cy.get('#phone')
        //   .type('abcdef')
        //   .should('have.value','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        //cy.get('#phone-checkbox').click()
        // corrigindo o código acima para usar o padrão correto .check() em vez do padrão .click
        cy.get('#phone-checkbox').check()
        //cy.get('button[type="submit"]').click()
        // identificando o button com cy.contains em vez de cy.get
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
            .type('Diego')
            .should('have.value','Diego')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Ozores')
            .should('have.value','Ozores')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('email@email.com')
            .should('have.value','email@email.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('55981214545')
            .should('have.value','55981214545')
            .clear()
            .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        //cy.get('button[type="submit"]').click()
        // identificando o button com cy.contains em vez de cy.get
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"',function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            // O .each abaixo recebe dentro dele uma função, e essa função está recebendo cada elemento radio disponível
            .each(function($radio){
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                // Esse comando abaixo verifica o nome do arquivo pra ver se foi o arquivo correto selecionado
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('meuarquivo')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@meuarquivo')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    // Exercício utilizando a alternativa 1
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr', 'target', '_blank')
        // solução do professor
        //cy.get('#privacy a').should('have.attr','target','_blank')
    })
    // Exercício utilizando a alternativa 2
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a')
            .invoke('removeAttr','target')
            .click()
        // solução do professor
        //cy.get('#privacy a').invoke('removeAttr','target').click()
    })
    // é possível fazer o exercício abaixo dentro desse mesmo arquivo, mas o mais indicado seria num novo arquivo (verificar o privacy.spec.js)
    //    it.only('testa a página da política de privacidade de forma independente',function(){
    //        cy.visit('./src/privacy.html')
    //        cy.get('#title').should('contain','CAC TAT - Política de privacidade')
    //    })
})