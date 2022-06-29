

describe('DELETE /characters/id', function () {

    const ororo = {
        name: 'Ororo Munroe',
        alias: 'Tempestade',
        team: ['x-men'],
        active: true
    }

    context('Quando tento deletar um personagem', function () {

        before(function () {
            cy.postCharacter(ororo).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve DELETAR personagem por cadastrado ID 204', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204);;
            })

            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404);
            })
        })

        it('deve DELETAR personagem por ID não cadastrado 404', function () {
            const id = '62b3ccbdf53e3b0cf100a4c0'
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404);
            })
        })

    })

})