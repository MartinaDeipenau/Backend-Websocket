import express from 'express'
import { Server } from 'socket.io'
import realTimeRouters from './routes/realTimeProducts.routes.js'
import { engine } from 'express-handlebars'
import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import * as path from 'path'
import { __dirname, __filename } from './path.js'


// Configuration express

const app = express()
const PORT = 4000

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

// Middleware

app.use(express.json()) // Me permite ejecutar json en la app
app.use(express.urlencoded({ extended: true })) // Me permite poder realizar consultas en (req.query)

const myServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// Server Io

const io = new Server(myServer) // , { cors: { origin: '*' } }

app.use((req, res, next) => {
    req.io = io
    return next()
})

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)
app.use('/api/realtimeproducts', realTimeRouters)