const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4007)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos una web de prueba
const testWebpage = {
    title: 'test-webpage-get-webpage',
    city: 'Pontevedra',
    scoring: 3
}

// Variable para almacenar el id de la web de prueba, que se usará para realizar la petición GET concreta a la web con ese id
let id

describe('GET /api/webpages/:id', () => {

    // Registrar web de prueba
    describe('Registrar una web de prueba', () => {
        it('Debería registrar un web de prueba', async () => {
            const response = await request(app)
                .post('/api/webpages')
                .send(testWebpage)

            expect(response.status).toBe(201)
            
            // Guardamos el id de la web registrada
            id = response.body.id
        })
    })

    describe('Mostrar página web con id específico', () => {
        it('Debería mostrar la web anteriomente creada', async () => {
            const response = await request(app)
                .get('/api/webpages/' + id)

            expect(response.status).toBe(200)

            // Comprobamos que la web devuelta es la misma que la registrada
            expect(response.body.title).toBe(testWebpage.title)
        })
    })
})
