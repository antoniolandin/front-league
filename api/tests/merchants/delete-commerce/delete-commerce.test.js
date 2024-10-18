const request = require('supertest')
const app = require('../../../app')
const { sequelize } = require('../../../models')

// Cuando se ejecuta el test, se levanta el servidor en un puerto arbitrario para que no interfiera con el servidor en producción
beforeAll(() => {
    server = app.listen(4032)
})

// Después de ejecutar los tests, se cierra el servidor y la conexión a la base de datos
afterAll(done => {
    server.close()
    sequelize.close()
    done()
})

// Comercio de prueba
const testCommerce = {
    "name": "Eliminame",
    "CIF": "N12345672",
    "address": "Calle Falsa 123",
    "email": "eliminame@proton.me",
    "phone": "123456789"
}

// Variable para almacenar el id del comercio de prueba, para poder eliminarlo por su id
let id

// Se crea un admin de pruebas
const testAdmin = {
    "name": "delete-commerce-admin",
    "email": "delete-commerce-admin@proton.me",
    "password": "delete-commerce-admin",
}

// Se crea una variable para guardar el token del admin
let token

describe('DELETE /api/merchants/:id', () => {

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

    // Registrar web de prueba
    describe('Registrar un comercio de prueba', () => {
        it('Debería registrar un comercio de prueba', async () => {
            const response = await request(app)
                .post('/api/merchants')
                .set('Authorization', `Bearer ${token}`)
                .send(testCommerce)

            expect(response.status).toBe(201)
            
            // Almacenar el id del comercio de prueba
            id = response.body.commerce.id
        })
    })

    describe('Eliminar comercio de prueba', () => {
        it('Debería eliminar un comercio de prueba', async () => {
            const response = await request(app)
                .delete(`/api/merchants/${id}`)
                .set('Authorization', `Bearer ${token}`)

            // Buscar el comercio eliminado por su id
            const commerceId = await request(app)
                .get('/api/merchants/id')
                .set('Authorization', `Bearer ${token}`)
            
            // Comprobar que la respuesta es 200
            expect(response.status).toBe(200)
            
            // Comprobamos que el comercio está vacío
            expect(commerceId.body).toStrictEqual({})
        })
    })

})
