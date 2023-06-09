import { Router } from "express";
import { ProductManager } from "../productManager.js"

const myProductManager = new ProductManager('./products.txt')
const productsRouters = Router()

// Get

productsRouters.get('/', async (req, res) => {
    let { limit } = req.query

    const productLimit = (await myProductManager.getProducts()).slice(0, limit)

    const product = await myProductManager.getProducts()

    limit 
    ? res.render('home', { products: productLimit }) 
    : res.render('home', { products: product })
})

productsRouters.get('/:id', async (req, res) => {
    const product = await myProductManager.getProductById(req.params.id)
    res.render('products', {
        title: product.title,
        price: product.price,
        stock: product.stock
    })
})

// Post

productsRouters.post("/", async (req, res) => {
    const { 
        title, 
        description, 
        price, 
        thumbnail, 
        status,
        category,
        code, 
        stock, 
    } = req.body
    await myProductManager.addProduct({ 
        title, 
        description, 
        price, 
        thumbnail, 
        status,
        category,
        code, 
        stock,
     })
    res.send("Product added")
})

// Put

productsRouters.put("/:id", async(req, res) => {
    const id = req.params.id

    const { 
        title, 
        description, 
        price, 
        thumbnail, 
        status,
        category,
        code, 
        stock, 
    } = req.body

    const message = await myProductManager.updateProduct(id, {
        title, 
        description, 
        price, 
        thumbnail,
        status,
        category, 
        code, 
        stock,
    })
    const products = await myProductManager.getProducts()
    res.send(message)
})

// Delete 

productsRouters.delete("/:id", async (req, res) => {
    const id = req.params.id
    const message = await myProductManager.deleteProduct(id)
    res.send(message)
})

export default productsRouters