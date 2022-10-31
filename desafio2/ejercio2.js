const fs = require('fs')

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
            console.log(productoEncontrado)
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
    

}

const productos = new Contenedor('productos')
productos.save({title:'titulo3', price:3, thumbnail: 'titulo3'})
// productos.getById(4)
// productos.getAll()
// productos.deleteById(2)
// productos.deleteAll()