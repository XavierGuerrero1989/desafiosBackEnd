const fs = require('fs')

class Contenedor {
    constructor(name){
        this.name = name
    }

    async save (obj) {
        try {
            // Verificamos si existe un archivo
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            // parseamos el archivo
            const archivoParse = JSON.parse(archivos) 
            // agregamos la funcion de marh max para obtener el id mas alto
            const ultimoId = archivoParse.reverse()
            // pusheamos el nuevo objeto al array de archivoParse y con el id sumado + 1
            archivoParse.push({...obj, id: ultimoId[0].id + 1 })
            // Agregamos nuevamente la lista de productos con los nuevos productos
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify(archivoParse, null , 2))
            .then(() => console.log('Se creo exitosamente el nuevo producto con el id: ' + (ultimoId[0].id + 1) ))
            .catch(() => console.log('Hubo un error al crearse el producto'))

        } catch (error) {
            // Si no existe el archivo, creamos por primera vez la lista de productos
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify([{...obj, id:1}], null , 2))
            .then(() => console.log('Se creo exitosamente el primer producto con el id: ' + 1))
            .catch(() => console.log('Hubo un error al crearse el producto'))
        }
        
    }

    async getById (id) {
        try {
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            // parseamos el archivo
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
            // parseamos el archivo
            const archivoParse = JSON.parse(archivos)
            console.log(archivoParse)
        } catch (error) {
            console.log('El archivo no existe')
        }
    }

    async deleteById (id) {
        try {
            const archivos = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            // parseamos el archivo
            const archivoParse = JSON.parse(archivos)
            // Se guarda el nuevo arreglos sin el id que queremos eliminar
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            if(!productoEncontrado) {
                throw new Error('No fue encontrado el producto')
            }
            let nuevoArray = archivoParse.filter(archivo => archivo.id !== id)
            if(!nuevoArray) {
                nuevoArray = []
            }
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify(nuevoArray, null, 2))
            .then(() => console.log('El archivo fue eliminado exitosamente'))
            .catch(() => console.log('Hubo un error al crearse el producto'))

        } catch (error) {
            console.log('El archivo no existe', error)
        }
    }

    async deleteAll () {
        try {
            await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            // Se sobrescribe con un array vacio
            fs.promises.writeFile(`./${this.name}.txt`, JSON.stringify([], null, 2))
            .then(() => console.log('Todos los archivos fueron eliminados'))
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