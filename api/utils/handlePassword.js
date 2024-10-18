const bcrypt = require('bcryptjs');

// Encriptar una contraseña en texto plano
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Comparar una contraseña en texto plano con una contraseña encriptada
const comparePassword = async (clearPassword, hashedPassword) => {
    return bcrypt.compare(clearPassword, hashedPassword);
    }

module.exports = { encryptPassword, comparePassword };

