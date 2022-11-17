class User {
    constructor (nombre, apellido, autorLibro, nombreLibro,  mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = [{nombreLibro, autorLibro}]
        this.mascotas = [mascotas]
    }

    getFullName() {
        console.log("El usuario se llama " + this.nombre + " " + this.apellido + ".") 
    }

    addMascota(mascotaN) {
        this.mascotas.push(mascotaN)
    }

    countMascotas() {
       console.log(this.nombre + " tiene " + this.mascotas.length + " mascotas.")
    }

    addBook(nombre, autor) {
        this.libros.push({nombreLibro: nombre, autorLibro: autor});
    }

    getBookNames() {
        let bookNames = this.libros.map(nombre => nombre.nombreLibro)
        console.log(bookNames)
    }
}

const usuario = new User("Xavier", "Guerrero", "Stepen Hawkins", "A brief History of Time", "Matiz")



usuario.addMascota("Pancho")
usuario.addBook("TLOTR", "J.R.R. Tolkien")

usuario.getFullName()
usuario.countMascotas()
usuario.getBookNames()



