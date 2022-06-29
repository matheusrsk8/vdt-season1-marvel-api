// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Request que autentica
Cypress.Commands.add('setToken', function () {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'rocha@qacademy.io',
            password: 'qa-cademy'
        },
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200);
        Cypress.env('token', response.body.token)
    })

})

//Request que limpa a base
Cypress.Commands.add('back2ThePast', function () {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/62953adb7ff1c90016bf94d6',
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200);
    })
})

//Request que testa o cadastro de usuários
Cypress.Commands.add('postCharacter', function (payload) {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response;
    })
})

//GET Request que pega os usuarios cadastrados
Cypress.Commands.add('getCharacters', function () {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response;
    })
})

//GET Request que pega os usuarios cadastrados
Cypress.Commands.add('getCharacterById', function (id) {
    cy.api({
        method: 'GET',
        url: '/characters/'+ id,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response;
    })
})

//DELETE Request que apaga o usuário por ID
Cypress.Commands.add('deleteCharacterById', function (id) {
    cy.api({
        method: 'DELETE',
        url: '/characters/'+ id,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response;
    })
})

Cypress.Commands.add('searchCharacters', function (characterName) {
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: {name: characterName},
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response;
    })
})

Cypress.Commands.add('populateCharacters', function (characters) {
    characters.forEach(function (c) {
        cy.postCharacter(c)
    })
})
