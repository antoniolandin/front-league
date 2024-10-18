const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4023)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos una web de prueba
const testWebpage = {
    title: 'test-webpage-get-all-commerces',
    city: 'Pontevedra',
    scoring: 3
}

describe('GET /api/webpages', () => {

    // Registrar web de prueba
    describe('Registrar una web de prueba', () => {
        it('Debería registrar un web de prueba', async () => {
            const response = await request(app)
                .post('/api/webpages')
                .send(testWebpage)

            expect(response.status).toBe(201)
        })
    })

    describe('Mostrar todas las webs', () => {
        it('Debería mostrar todas las webs', async () => {
            const response = await request(app)
                .get('/api/webpages')

            expect(response.status).toBe(200)
        })
    })
})
