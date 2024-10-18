const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: '2h',
        } 
    )

    return sign;
}

const tokenSignMerchant = (merchant) => {
    const sign = jwt.sign(
        {
            id: merchant.id,
            webpageId: merchant.webpageId,
        },
        JWT_SECRET,
        {
            expiresIn: '2h',
        } 
    )

    return sign;
}

const tokenVerify = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log(`Error al verificar el token: ${error.message}`);
    }
}

module.exports = {
    tokenSign,
    tokenSignMerchant,
    tokenVerify,
}

