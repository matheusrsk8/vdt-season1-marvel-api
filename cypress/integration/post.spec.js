import factoryPage from '../factories/postFactory'


describe('POST /characters', function () {

    it('deve cadastrar personagem', function () {
        const character = {
            name: 'Tony Stark',
            alias: 'Homem de Ferro',
            team: ['Vingadores'],
            active: false
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201);
                expect(response.body.character_id.length).to.eql(24);
            })
    })

    context('quando o persongem já estiver cadastrado', function () {
        const character = {
            name: 'Bruce Banner',
            alias: 'hulk',
            team: ['Vingadores', 'hulk'],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201);
                })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400);
                    expect(response.body.error).to.eql('Duplicate character');
                })
        })
    })

    context('quando o persongem já estiver cadastrado', function () {

        it('Campo name', function () {

            var character = factoryPage.character();
            character.name = null;

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.keys).to.contain('name');
                })
        })

        it('Campo alias', function () {

            var character = factoryPage.character();
            character.alias = null;

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.keys).to.contain('alias');
                })
        })

        it('Campo team', function () {

            var character = factoryPage.character();
            character.team = null;

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.keys).to.contain('team');
                })
        })

        it('Campo active', function () {

            var character = factoryPage.character();
            character.active = null;

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.keys).to.contain('active');
                })
        })
    })

})
