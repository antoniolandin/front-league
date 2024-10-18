const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4035)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/users/update-user/tests').filter(file => file.endsWith('.json'))

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
                user: testCase.user,
                expected: {
                    status: testCase.expected.status,
                    body: testCase.expected.body
                }
            }
        })
    }
})

// Usuario de prueba
const testUser = {
    "name": "test-update-user",
    "email": "test-update-user@proton.me",
    "password": "test-update-user"
}

// Se inicializa la variable id para almacenar el id del usuario de prueba
let id

// Se inicializa la variable token para almacenar el token del usuario de prueba
let token

describe('PUT /api/users/:id', () => {
    
    // Se crea una página web de prueba
    describe('Creación del usuario de prueba', () => {
        test('Debería crear un usuario de prueba', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser)
            
            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('token')
            expect(response.body).toHaveProperty('user')
            
            // Se almacena el id del usuario de prueba
            id = response.body.user.id
            token = response.body.token
        })
    })

    describe.each(table)('$title', ({ tests }) => {
        test.each(tests)('$title', async ({ user, expected }) => {
            // Se envía la petición al servidor
            const response = await request(app)
                .put('/api/users/' + id)
                .set('Authorization', 'Bearer ' + token)
                .send(user)

            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(expected.status)
           
            // Se comprueba que el cuerpo de la respuesta sea el esperado
            for (const key in user) {
                expect(response.body[key]).toBe(user[key])
            }
        })
    })
})
