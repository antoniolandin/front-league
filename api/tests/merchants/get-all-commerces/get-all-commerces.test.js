const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4022)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos una web de prueba
const testCommerce = {
    "name": "Test Commerce",
    "CIF": "A12345678",
    "address": "Calle Test, 1",
    "email": "test-commerce@proton.me",
    "phone": "123456789"
}

// Se crea un admin de pruebas
const testAdmin = {
    "name": "get-all-commerces-admin",
    "email": "get-all-commerces-admin@proton.me",
    "password": "get-all-commerces-admin",
}

// Se crea una variable para guardar el token del admin
let token

describe('GET /api/merchants', () => {

    // Registrar un admin de pruebas
    describe("Registrar un admin de pruebas", () => {
        test("Debería registrar un admin de pruebas", async () => {
            const response = await request(app)
                .post('/api/admin/register')
                .send(testAdmin)

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('token')
            expect(response.body).toHaveProperty('user')

            token = response.body.token
        })
    })

    // Registrar un comercio de prueba
    describe('Registrar un comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .set('Authorization', `Bearer ${token}`)
                .send(testCommerce)

            expect(response.status).toBe(201)
        })
    })

    describe('Mostrar todos los comercios', () => {
        it('Debería mostrar todos los comercios', async () => {
            const response = await request(app)
                .get('/api/merchants')
                .set('Authorization', `Bearer ${token}`)
            
            // Comprobamos que la petición ha sido exitosa
            expect(response.status).toBe(200)

            // Comprobamos que el comercio de prueba está en la lista
            expect(response.body.map(commerce => commerce.CIF)).toContain(testCommerce.CIF)
        })
    })
})
