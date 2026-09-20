import { ObjectId } from 'mongodb';
import { client, DB_NAME } from '../common/db.js';

export const peliculaCollection = 'pelicula';

export async function handleInsertPeliculaRequest(req, res) {
    const { nombre, generos, anioEstreno } = req.body;
    const db = client.db(DB_NAME);
    const nuevaPelicula = {
        nombre: String(nombre),
        generos: Array.isArray(generos) ? generos : [],
        anioEstreno: parseInt(anioEstreno)
    };

    return db.collection(peliculaCollection).insertOne(nuevaPelicula)
        .then((result) => res.status(201).json({ _id: result.insertedId, ...nuevaPelicula }))
        .catch(() => res.status(500).json({ error: 'Error al agregar la película' }));
}

export async function handleGetPeliculasRequest(req, res) {
    const db = client.db(DB_NAME);

    return db.collection(peliculaCollection).find().toArray()
        .then((peliculas) => res.status(200).json(peliculas))
        .catch(() => res.status(500).json({ error: 'Error al obtener las películas' }));
}

export async function handleGetPeliculaByIdRequest(req, res) {
    const { id } = req.params;
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (e) {
        return res.status(400).json({ error: 'Id mal ingresado' });
    }

    const db = client.db(DB_NAME);
    return db.collection(peliculaCollection).findOne({ _id: objectId })
        .then((pelicula) => {
            if (!pelicula) {
                return res.status(404).json({ error: 'Película no existente' });
            }
            return res.status(200).json(pelicula);
        })
        .catch(() => res.status(500).json({ error: 'Error al obtener la película por ID' }));
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
    const { id } = req.params;
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (e) {
        return res.status(400).json({ error: 'Id mal ingresado' });
    }

    const db = client.db(DB_NAME);
    const updateData = req.body;

    return db.collection(peliculaCollection).updateOne(
        { _id: objectId },
        { $set: updateData }
    )
    .then((result) => {
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Película no existente' });
        }
        return res.status(200).json({ mensaje: 'Película actualizada de forma correcta' });
    })
    .catch(() => res.status(500).json({ error: 'Error al actualizar la película' }));
}

export async function handleDeletePeliculaByIdRequest(req, res) {
    const { id } = req.params;
    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (e) {
        return res.status(400).json({ error: 'Id mal ingresado' });
    }

    const db = client.db(DB_NAME);
    return db.collection(peliculaCollection).deleteOne({ _id: objectId })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Película no existente' });
            }
            return res.status(200).json({ mensaje: 'Película eliminada de forma correcta' });
        })
        .catch(() => res.status(500).json({ error: 'Error al eliminar la película' }));
}