const express = require('express');
const fs = require('fs');
const router = express.Router();

// Función para eliminar la extensión de un archivo
const removeExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.')
}

fs.readdirSync(__dirname).filter((file) => {
    const fileName = removeExtension(file)

    if (fileName !== 'index') {
        router.use(`/${fileName}`, require(`./${fileName}`))
    }
})

module.exports = router
