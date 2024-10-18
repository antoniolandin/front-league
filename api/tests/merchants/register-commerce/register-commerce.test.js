const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4003)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/merchants/register-commerce/tests').filter(file => file.endsWith('.json'))

const tests = files.map(file => {
    return require(`./tests/${file}`)
})

// Ahora tenemos que procesar los tests para que sean ejecutados por Jest
// Cada test tiene un título y un array de tests
// Cada test tiene un título, un comercio y un objeto expected
// El objeto expected tiene un status y un body
const table = tests.map(test => {
    return {
        title: test.title,
        tests: test.tests.map(testCase => {
            return {
                title: testCase.title,
                commerce: testCase.commerce,
                expected: {
                    status: testCase.expected.status,
                    body: testCase.expected.body
                }
            }
        })
    }
})

// Se crea un admin de pruebas
const testAdmin = {
    "name": "update-commerce-admin",
    "email": "update-commerce-admin@proton.me",
    "password": "update-commerce-admin",
}

// Se crea una variable para guardar el token del admin
let token

describe('POST /merchants', () => {

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
    
    // Se ejecutan los tests
    describe.each(table)('$title', ({ tests }) => {
        test.each(tests)('$title', async ({ commerce, expected }) => {
            // Se envía la petición al servidor
            const response = await request(app)
                .post('/api/merchants')
                .set('Authorization', `Bearer ${token}`)
                .send(commerce)

            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(expected.status)

            if (expected.body) {
                expect(response.body).toEqual(expected.body)
            }
        })
    })
})
