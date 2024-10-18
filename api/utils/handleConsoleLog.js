function log(...args) {
    // Juntamos todos los argumentos en un solo string con salto de línea
    const message = args.join('\n')
    // Mostramos el mensaje en consola
    console.log(message)
}

module.exports = log
