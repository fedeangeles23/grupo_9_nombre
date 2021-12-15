// APP.JS es nuestro entry point.
// npm init para iniciar, 
//npm install express para que se cree la carpeta node_modules
// codear los require express y path y asignar puerto 

// express se instala en cada proyecto por separado 

const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path')
const method0verride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}
http://localhost:${PORT}
`));


//View engine setup---

app.set('views', path.join(__dirname, 'views')); //Ubicacion de la carpeta views

app.set('view engine','ejs'); // setea que el view engine sera EJS 


//middlewares

app.use(express.static(path.join(__dirname, '../public')));
//Sirve para solicitudes en donde se envian datos POST y PUT
app.use(express.urlencoded({ extended: false }));
//para trabajar con forms
app.use(express.json());
app.use(method0verride('__method'))

/* Enrutadores */

let login = require('./routes/loginRouter')
let registro = require('./routes/registroRouter') 
let home = require('./routes/homeRouter')

let perfil = require('./routes/perfilRouter')
let detail = require('./routes/productRouter')

let admin = require('./routes/adminRouter')

let carrito = require ('./routes/cartRouter')

/* ----------------------------------------- */
app.use('/', home);

app.use('/carrito', carrito)

app.use('/login', login);
 
app.use('/registro', registro);

app.use('/productDetail', detail)

app.use('/perfil', perfil)

app.use('/admin', admin);

