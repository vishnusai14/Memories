const JWT = require("jsonwebtoken")
const Cookies = require('universal-cookie')
 


const check = (request, key) => {
    let SSID = undefined
    let user = undefined
    try {
        const cookies = new Cookies(request.headers.cookie);
        SSID = cookies.get('SSID')
        user = JWT.verify(SSID, key)
     } catch (error) {
        console.log(error)
        SSID = undefined
    }
    return user
}

module.exports = check