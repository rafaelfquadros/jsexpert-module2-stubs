const Service = require('./service');
const { deepStrictEqual } = require('assert');
const sinon = require('sinon');
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';
const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json')
}

;(async () => {
    const service = new Service()
    {
        // This way it goes to the internet
        // const resultWithouStub = await service.makeRequest(BASE_URL_2)
        // console.log(JSON.stringify(resultWithouStub))
    }

    // NOW USING STUBS
    const stub = sinon.stub(service, service.makeRequest.name)
    
    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)

    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)

    {
        const expected = {
            name: 'Tatooine',
            surfaceWater: '1',
            appearedIn: 5
        }

        const response = await service.getPlanets(BASE_URL_1);

        deepStrictEqual(response, expected);
    }
    {
        const expected = {
            name: 'Alderaan',
            surfaceWater: '40',
            appearedIn: 2
        }

        const response = await service.getPlanets(BASE_URL_2);

        deepStrictEqual(response, expected);
    }
})()