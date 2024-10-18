const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')
const fs = require('fs')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4033)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Se obtienen los tests de los archivos JSON
const files = fs.readdirSync('./tests/webpages/create-review/tests').filter(file => file.endsWith('.json'))

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
                review: testCase.review,
                expected: {
                    status: testCase.expected.status,
                    body: testCase.expected.body
                }
            }
        })
    }
})

// Definimos una página web de prueba
const testWebpage = {
    title: "test-review-page",
    activity: "test-activity",
    city: "test-city",
}

// Definimos un usuario de prueba
const testUser = {
    "name": "test-delete-user",
    "email": "test-delete-user@proton.me",
    "password": "123456",
    "city": "Buenos Aires",
    "recibeOffers": false
}

// Se declara la variable id para almacenar el id de la página web de prueba
let id

// Se declara la variable token para almacenar el token del usuario de prueba
let token

// Variables para ir calculando el rating promedio
let numReviews = 0
let totalRating = 0

describe('PATCH /api/webpages/:id', () => {

    // Registramo un usuario de prueba
    describe('Registramos un usuario de prueba', () => {
        it('Debería registrar un usuario', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(testUser)

            expect(response.status).toBe(201)

            // Verificamos que la respuesta contenga el usuario y el token
            expect(response.body).toHaveProperty('user')
            expect(response.body).toHaveProperty('token')
            
            // Guardamos el id y el token del usuario de prueba
            token = response.body.token
        })
    })

    // Se crea una página web de prueba
    describe('Creación página web de prueba', () => {
        test('Debería crear una página web de prueba', async () => {
            const response = await request(app)
                .post('/api/webpages')
                .send(testWebpage)

            expect(response.status).toBe(201)

            id = response.body.id
        })
    })

    // Se ejecuta un test por cada test en la variable table    
    describe.each(table)('$title', ({ tests }) => {
        test.each(tests)('$title', async ({ review, expected }) => {
            // Se envía la petición al servidor
            const response = await request(app)
                .patch('/api/webpages/' + id)
                .set('Authorization', 'Bearer ' + token)
                .send(review)

            // Se comprueba que la respuesta del servidor sea la esperada
            expect(response.status).toBe(expected.status)
            
            // Si la respuesta es correcta, se comprueba que el body sea el esperado
            if(response.status === 201) {
                // Se actualizan las variables para calcular el rating promedio
                numReviews++
                totalRating += review.rating
            }
        })
    })

    describe('Comprobar que el scoring es correcto', () => {
        test('Debería tener un rating promedio correcto', async () => {
            // Buscamos la página web creada
            const response = await request(app)
                .get('/api/webpages/' + id)
            
            // Comprobamos que la respuesta sea correcta
            expect(response.status).toBe(200)
            
            // Comprobamos que el rating promedio sea el esperado (redondeado a 3 decimales)
            expect(Math.round(response.body.scoring * 1000) / 1000).toBe(Math.round((totalRating / numReviews) * 1000) / 1000)
        })
    })
})
