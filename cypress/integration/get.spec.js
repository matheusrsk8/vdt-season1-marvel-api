

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles noturno',
            alias: 'Professor X',
            team: ['x-men'],
            active: false
        },

        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['x-men'],
            active: false
        },

        {
            name: 'Clinton Barton',
            alias: 'Arqueiro',
            team: ['novos vingadores'],
            active: false
        }
    ]


    before(function () {
        cy.populateCharacters(characters)
    })

    it('deve retornar lista de personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200);
            expect(response.body).to.be.a('array');
            expect(response.body.length).greaterThan(0);
        })

    })

    it('deve buscar personagem por nome', function () {

        cy.searchCharacters('Clinton Barton').then(function (response) {
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(1);
            expect(response.body[0].alias).to.eql('Arqueiro');
            expect(response.body[0].team).to.eql(['novos vingadores']);
            expect(response.body[0].active).to.eql(false);
        })

    })
})

describe('GET /characters/id', function () {

    const noturno = {
        name: 'Noturno noturno',
        alias: 'Noturono',
        team: ['x-men'],
        active: false
    }


    context('Quando tento buscar um personagem', function () {

        before(function () {
            cy.postCharacter(noturno).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar por ID cadastro 200', function () {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(200);
                expect(response.body.alias).to.eql(noturno.alias);
                expect(response.body.team).to.eql(noturno.team);
                expect(response.body.active).to.eql(noturno.active);
            })
        })

        it('deve buscar por ID não cadastrado 404', function () {
            const id = '62b3ccbdf53e3b0cf100a4c0'
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404);
            })
        })

    })

})