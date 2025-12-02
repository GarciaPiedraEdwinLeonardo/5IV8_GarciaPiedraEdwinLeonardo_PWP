import express from 'express';
import path from 'path';
//Aqui nosotros tenemos que agregar las rutas que se van a consumir
import productRouter from './routes/productRouter'

const app = express();
const PORT = process.env.PORT || 3000

const __dirname = path.resolve(); //Obtener el directorio actual

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend', 'public')));

app.set('views engine', 'ejs');
app.set('pubic', path.join(__dirname, '../Frontend', 'public'));

app.use('/', productRouter);

app.listen(PORT, () =>{
    console.log('Servidor corriendo en ');
});