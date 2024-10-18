const request = require('supertest')
const app = require('../../../app')
const { sequelize, user } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4002)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un usuario de prueba
const test_admin = {
    name: "testAdmin",
    email: "testAdmin@proton.me",
    password: "12345678",
    role: "admin"
}

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/admin/login/tests').filter(file => file.endsWith('.json'))

const tests = files.map(file => {
    return require(`./tests/${file}`)
})

// Ahora tenemos que procesar los tests para que sean ejecutados por Jest
// Cada test tiene un título y un array de tests
// Cada test tiene un título, un usuario y un objeto expected
// El objeto expected tiene un status y un body
const table = tests.map(test => {
    return {
        title: test.title,
        tests: test.tests.map(testCase => {
            return {
                title: testCase.title,
                login: testCase.login,
                expected: {
                    status: testCase.expected.status,
                    token: testCase.expected.token
                }
            }
        })
    }
})

// Test para el endpoint POST /login
describe('POST /api/admin/login', () => {
    // Primero, registramos un usuario de prueba
    describe('Registrar al admin de prueba', () => {      
        it('Debería registrar un admin', async () => {
            const res = await user.create(test_admin)
            
            // Esperamos que el objeto devuelto tenga las propiedades esperadas
            expect(res).toHaveProperty('id')
            expect(res).toHaveProperty('name', test_admin.name)
            expect(res).toHaveProperty('email', test_admin.email)
        })
    })
    
    // Luego, ejecutamos los tests de login
    describe('Pruebas de login', () => {
        describe.each(table)('$title', ({ tests }) => {
            test.each(tests)('$title', async ({ login, expected }) => {
                // Hacemos la petición POST /login
                const res = await request(app)
                    .post('/api/admin/login')
                    .send(login)
                
                // Esperamos que el status de la respuesta sea el esperado
                expect(res.statusCode).toEqual(expected.status)
                
                // Si el status es 2xx (exitoso), esperamos que el body tenga una propiedad token
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    expect(res.body).toHaveProperty('token')
                }
            })
        })
    })
})

