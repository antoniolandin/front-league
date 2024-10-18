const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4006)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un web de prueba
const testWebpages = [
    {
        title: 'test-webpage',
        city: 'Sevilla',
        scoring: 3
    },
    {
        title: 'test-webpage2',
        city: 'Sevilla',
        scoring: 2
    }
]

const ciudad = testWebpages[0].city

describe('GET /api/webpages/search/:city', () => {
    
    describe.each(testWebpages)('Registrar webs de prueba', (webpage) => {
        it('Debería registrar una web', async () => {
            const response = await request(app)
                .post('/api/webpages')
                .send(webpage)

            expect(response.status).toBe(201)
        })
    })

    describe('Mostrar todas las webs', () => {
        it('Debería mostrar las webs de ' + ciudad + ' ordenados por score de forma ascendente', async () => {
            const response = await request(app)
                .get('/api/webpages/search/' + ciudad + '?asc=true')

            // Comprobamos que la respuesta es correcta
            expect(response.status).toBe(200)

            // Comprobamos que el orden es correcto
            const sortedTestWebpages = testWebpages.sort((a, b) => a.scoring - b.scoring)

            // Comprobamos que los webs son correctos
            expect(response.body.map(webpages => webpages.title)).toEqual(sortedTestWebpages.map(webpage => webpage.title))
        })
    })
})
