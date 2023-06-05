import app from './app.js'

app.listen(process.env.PORT || 4001);

console.log(`Server Escuchando en el puerto: ${process.env.PORT || 4001}`)
