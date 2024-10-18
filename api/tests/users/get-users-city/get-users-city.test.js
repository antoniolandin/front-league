const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4009)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un comercio de prueba
const testUsers = [
    {
        "name": "test-user",
        "email": "test-user@proton.me",
        "password": "123456",
        "city": "Buenos Aires",
        "recibeOffers": false
    },
    {
        "name": "test-user2",
        "email": "test-user2@proton.me",
        "password": "123456",
        "city": "Buenos Aires",
        "recibeOffers": true
    },
    {
        "name": "test-user3",
        "email": "test-user3@proton.me",
        "password": "123456",
        "city": "Rosario",
        "recibeOffers": true
    }
]

// Definimos un comercio de prueba
const testCommerce = {
    name: "get-city-commerce",
    CIF: "H12349679",
    address: "Calle de la piruleta",
    email: "get-city-commerce@proton.me",
    phone: "123456789"
}

// Se crea una variable para guardar el token del comercio
let token_commerce

// Definimos a nuestro admin de prueba
const testAdmin = {
    "name": "get-city-commerce-admin",
    "email": "get-city-commercer-admin@proton.me",
    "password": "get-city-commerce-admin",
}

// Se declara la variable token para almacenar el token del admin de prueba
let token

describe('GET /api/users/:city', () => {

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
            
            // Se almacena el id del comercio de prueba
            id = response.body.commerce.id

            // Se almacena el token del comercio de prueba
            token_commerce = response.body.token
        })
    })

    // Registramos usuarios de prueba
    describe.each(testUsers)('Registrar usuario', (user) => {
        it('Debería registrar un usuario', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(user)

            expect(response.status).toBe(201)
        })
    })
    
    describe('Mostrar todos los usuarios', () => {
        it('Debería mostrar los usuarios de Buenos Aires', async () => {
            const response = await request(app)
                .get('/api/users/Buenos Aires')
                .set('Authorization', `Bearer ${token_commerce}`)

            // Comprobamos que la petición ha sido exitosa
            expect(response.status).toBe(200)

            // Comprobamos que solo se muestrán los usuarios de Buenos Aires y que reciban ofertas
            response.body.users.forEach(user => {
                expect(user.city).toBe('Buenos Aires')
                expect(user.recibeOffers).toBe(true)
            })
        })
    })
})
