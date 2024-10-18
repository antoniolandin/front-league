const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4008)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

const testWebpage = {
    "title": "Eliminame"
}

// Variable para almacenar el id del webpage de prueba, para poder eliminarlo por su id
let id

describe('DELETE /api/webpages/:id', () => {

    // Registrar web de prueba
    describe('Registrar una web de prueba', () => {
        it('Debería registrar una web de prueba', async () => {
            const response = await request(app)
                .post('/api/webpages')
                .send(testWebpage)

            expect(response.status).toBe(201)

            id = response.body.id
        })
    })

    describe('Eliminar webpage de prueba', () => {
        it('Debería eliminar un webpage de prueba', async () => {
            const response = await request(app)
                .delete(`/api/webpages/${id}`)

            const allWebpages = await request(app)
                .get('/api/webpages')
            
            // Comprobar que la respuesta es 200
            expect(response.status).toBe(200)

            // Comprobar que el CIF del webpage de prueba no está en la lista de webpages
            const nombres = allWebpages.body.map(webpage => webpage.title)
            expect(nombres).not.toContain(testWebpage.title)
        })
    })

})
