const fs = require('fs')
const express = require('express')

const app = express()


class Contenedor {
    constructor(name){
        this.name = name
    }



    async save (obj) {
        try {
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            const archivoParse = JSON.parse(archivos) 
            const ultimoId = archivoParse.reverse()
            archivoParse.push({...obj, id: ultimoId[0].id + 1 })
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify(archivoParse, null , 2))
            .then(() => console.log('Se creo exitosamente el nuevo producto con el id: ' + (ultimoId[0].id + 1) ))
            .catch(() => console.log('Hubo un error al crearse el producto'))

        } catch (error) {
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify([{...obj, id:1}], null , 2))
            .then(() => console.log('Se creo exitosamente el primer producto con el id: ' + 1))
            .catch(() => console.log('Hubo un error al crearse el producto'))
        }
        
    }

    async getById (id) {
        try {
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            const archivoParse = JSON.parse(archivos)
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            if(!productoEncontrado) {
                throw new Error('No fue encontrado')
            }
            // console.log(productoEncontrado)
        } catch (error) {
            console.log('El archivo no existe', error)
        }
    }

    async getAll () {
        try {
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            const archivoParse = JSON.parse(archivos)
            console.log(archivoParse)
        } catch (error) {
            console.log('El archivo no existe')
        }
    }

    async deleteById (id) {
        try {
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            const archivoParse = JSON.parse(archivos)
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            if(!productoEncontrado) {
                throw new Error('El producto no Existe!')
            }
            let nuevoArray = archivoParse.filter(archivo => archivo.id !== id)
            if(!nuevoArray) {
                nuevoArray = []
            }
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify(nuevoArray, null, 2))
            .then(() => console.log('El archivo fue eliminado exitosamente'))
            .catch(() => console.log('Hubo un error al borrarse el producto'))

        } catch (error) {
            console.log('El archivo no existe', error)
        }
    }

    async deleteAll () {
        try {
            await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify([], null, 2))
            .then(() => console.log('Todos los productos fueron eliminados'))
            .catch(() => console.log('Hubo un error al eliminar el contenido'))

        } catch (error) {
            console.log('El archivo no existe', error)
        }
    }

    // FUNCION ESPECIFICA PARA BUSCAR POR ID RANDOM, CUYO INTERVALO NO SE PASE DE LA CANTIDAD DE ELEMENTOS QUE HAY DENTRO DEL ARCHIVO

    // async getByIdRandom () {

    //     try {
    //         const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
    //         const archivoParse = JSON.parse(archivos)
    //         let idRandom = Math.floor(Math.random() * archivoParse.length) + 1
    //         const productoEncontrado = archivoParse.find(archivo => archivo.id === idRandom)
    //         if(!productoEncontrado) {
    //             throw new Error('No fue encontrado')
    //         }
    //         // console.log(productoEncontrado)
    //         // elementosRandom = productoEncontrado
    //         return productoEncontrado
    //     } catch (error) {
    //         console.log('El archivo no existe', error)
    //     }
    // }
    
    // async getAllNew () {
    //     try {
    //         const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
    //         const archivoParse = JSON.parse(archivos)
    //         // const archivoString = JSON.stringify(archivoParse)
    //         // console.log(archivoParse)
    //         // elementosDelArray = archivoParse
    //         return archivoParse
    //     } catch (error) {
    //         console.log('El archivo no existe')
    //     }
    // }

}

const productos = new Contenedor('productos')
// productos.save({title:'Escuadra', price:123.45, thumbnail: 'thumbEscuadra'})
// productos.save({title:'Calculadora', price:234.56, thumbnail: 'thumbCalculadora'})
// productos.save({title:'Globo Terraqueo', price:345.67, thumbnail: 'thumbGlobo'})
// productos.getById(4)
// productos.getAll()
// productos.deleteById(2)
// productos.deleteAll()
// productos.getByIdRandom()
// productos.getAllNew()




const getProducts = async () => {
    listProducts = JSON.stringify(await productos.getAll());
    return listProducts;
}

const getProductRandom = async (min, max) => {
    let id = Math.floor(Math.random() * (max - min) + min)
    let randomProduct = JSON.stringify(await productos.getById(id));
    return randomProduct;
}

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenido</h1>`);
})

app.get('/productos',async (req, res) => {
    res.send(`<h1>Nuestros Articulos:</h1> ${await getProducts().catch("Error")}`);
})

app.get('/productosRandom',async (req, res) => {
    res.send(`<h1>El producto es:</h1> ${await getProductRandom(1, await productos.getLength()).catch("Error")}`);
})

const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.error(`Error en el servidor ${error}`));

   


// const server = app.listen(PORT, () => {
//     console.log('Servidor escuchando en el puerto 8080')
// })
// server.on("error", error => console.log('Error en servidor $(error)'))

//     app.get('/productos', (req, res) => {
//     res.send('mensaje: ' + elementosDelArray)
//     // res.send('los productos son ' + elementosDelArray)
// })



// app.get('/productoRandom', (req, res) => {
//     res.send(productos.getByIdRandom())
// })


