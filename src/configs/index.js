
const config = {
  db: {
    host: process.env.MYSQL_HOST,
    name: process.env.MYSQL_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
  server: {
    host: process.env.API_HOST,
    port: process.env.EXPRESS_PORT,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_KEY,
    secret: process.env.CLOUDINARY_SECRET,
    uri: process.env.CLOUDINARY_LINK,
  },
  tokenExpiresIn: process.env.TOKEN_EXPIRESIN,
  emailName: process.env.EMAIL_NAME,
  emailPassword: process.env.EMAIL_PASSWORD
}

module.exports = config