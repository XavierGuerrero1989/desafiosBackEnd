// http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>

const express = require('express')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('formulario', req.query)
})

app.listen(8080)