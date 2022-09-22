const express =require('express')
const app= express()
const Contenedor= require('./fileClass')

app.get('/productos', async (req,res) =>{
    const listaP= new Contenedor('./productos.txt')
    let producto= JSON.stringify(await listaP.productos())
    res.send(`Los productos son: ${producto}`)

})

app.get('/productoRandom', async (req, res) =>{
    const listaP= new Contenedor('./productos.txt')
    let aleatorio= JSON.stringify(await listaP.productRandom())    
    res.send(`Productos Random: ${aleatorio}`)
})

const PORT= process.env.PORT || 8080

const server = app.listen(PORT, ()=> console.log('Server is running'))
server.on('error', error => console.log(`Error: ${error}`))