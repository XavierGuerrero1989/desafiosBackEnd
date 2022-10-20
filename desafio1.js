class User {
    constructor (nombre, apellido, autorLibro, nombreLibro,  mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = [{nombreLibro, autorLibro}]
        this.mascotas = [mascotas]
    }

    getFullName() {
        return this.nombre + " " + this.apellido
    }

    addMascota(mascotaN) {
        this.mascotas.push(mascotaN)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({nombreLibro: nombre, autorLibro: autor});
    }

    getBookNames() {
        for (var i = 0; i <= (this.libros.length - 1); i++) {
           
            return this.libros[i].nombreLibro;
          }
    }
}

const usuario = new User("Xavier", "Guerrero", "Stepen Hawkins", "A brief History of Time", "Matiz")



usuario.addMascota("Pancho")
usuario.addBook("TLOTR", "J.R.R. Tolkien")

console.log(usuario.getFullName())
console.log(usuario.countMascotas())
console.log(usuario.getBookNames())
console.log(usuario)


