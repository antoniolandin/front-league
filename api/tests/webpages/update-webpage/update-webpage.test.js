const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4005)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/webpages/update-webpage/tests').filter(file => file.endsWith('.json'))

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
                webpage: testCase.webpage,
                expected: {
                    status: testCase.expected.status,
                    body: testCase.expected.body
                }
            }
        })
    }
})

// Se declara el comercio de prueba
const testCommerce = {
    name: 'update-webpage-commerce',
    CIF: 'K32040698',
    address: 'Calle de prueba',
    email: 'comercioPrueba@proton.me',
    phone: '666666666'
}

// Definimos a nuestro admin de prueba
const testAdmin = {
    "name": "update-webpage-admin",
    "email": "update-webpage-admin@proton.me",
    "password": "update-webpage-admin",
}

// Se declara la variable token para almacenar el token del admin de prueba
let token

// Se declara la variable token_commerce para almacenar el token del comercio de prueba
let token_commerce

// Se inicializa la variable id para almacenar el id de la página web de prueba
let id

describe('PUT /api/webpages/:id', () => {

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

    // Registrar comercio de prueba
    describe('Registrar comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .set('Authorization', `Bearer ${token}`)
                .send(testCommerce)
            
            // Se comprueba que la respuesta del servidor sea correcta
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('token')
            expect(response.body).toHaveProperty('commerce')
            expect(response.body).toHaveProperty('webpage')

            // Se almacena el id de la página web de prueba
            id = response.body.webpage.id
            token_commerce = response.body.token
        })
    })
    
    describe.each(table)('$title', ({ tests }) => {
        test.each(tests)('$title', async ({ webpage, expected }) => {
            // Se envía la petición al servidor
            const response = await request(app)
                .put('/api/webpages/' + id)
                .set('Authorization', `Bearer ${token_commerce}`)
                .send(webpage)

            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(expected.status)
            
            // Se comprueba que el cuerpo de la respuesta sea el esperado
            for (let key in webpage) {
                expect(response.body[key]).toEqual(webpage[key])
            }
        })
    })
})
