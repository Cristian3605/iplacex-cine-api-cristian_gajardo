import express from 'express';
import cors from 'cors';
import { connectDB } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import ActorRoutes from './src/actor/routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex');
});

app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor de Express conctado con exito en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('No se pudo conectar a MongoDB Atlas.', error);
    });