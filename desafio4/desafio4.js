const express = require('express')
const { Router } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos/p', express.static('productos'))

const productos = []

// const routerProductos = new Router()
const routerProductos = express.Router()

routerProductos.get('/', (req, res) => {
    res.json(productos)
})

routerProductos.post('/p', (req, res) => {
    if (productos.length == 0){
    productos.push({...req.body, id: 1} )
    res.json('Se creo exitosamente el nuevo producto con el id: 1')
    }

    const ultimoId = productos.reverse()
    productos.push({...req.body, id: ultimoId[0].id + 1} )
    res.json('Se creo exitosamente el nuevo producto con el id: ' + (ultimoId[0].id + 1))
})

routerProductos.get('/:id', (req, res) => {
    let id = req.params.id
   let resultado = productos.filter( function (productos) {
                return productos.id == id
                
              })
              
            let resultado1 = (resultado.length > 0) ? resultado[0] : null

res.json(resultado1)
})

routerProductos.put('/:id', (req, res) => {
    let id = req.params.id
    const indexOfProd = productos.findIndex(producto => {
        return producto.id === id;
      });
    productos.splice(indexOfProd, 1)
    productos.push({...req.body, id: {id}} )
    
})

routerProductos.delete('/:id', (req, res) => {
    let id = req.params.id
    const indexOfProd = productos.findIndex(producto => {
        return producto.id === id;
      });
    productos.splice(indexOfProd, 1)
})


app.use('/api/productos', routerProductos)

  
const server = app.listen(8080, () => {
    console.log('escuchando en el 8080')
})


