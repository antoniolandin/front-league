const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4011)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Definimos un usuario de prueba
const testUser = {
    "name": "delete-user",
    "email": "delete-user@proton.me",
    "password": "123456",
    "city": "Buenos Aires",
    "recibeOffers": false
}

// Definimos una variable para almacenar el id del usuario de prueba, ya que lo necesitaremos para el test de eliminar un usuario por su id
let id

// Definimos una variable para almacenar el token del usuario de prueba, ya que lo necesitaremos para el test de eliminar un usuario por su id
let token

describe('DELETE /api/users/:id', () => {

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
            id = response.body.user.id
            token = response.body.token
        })
    })

    // Obtenemos usuarios de Buenos Aires
    describe('Eliminamos un usuario', () => {
        it('Debería eliminar un usuario', async () => {
            const response = await request(app)
                .delete(`/api/users/${id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
        })
    })
})
