import { pool } from '../database'
const helpers = require('../libs/helpers');


//LISTAR
export const readAllUsuario = async(req, res) => {
    try {
        const response = await pool.query('select *from usuario');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//BUSCAR
export const readUsuario = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from usuario where idusuario=$1', [id]);

        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//ELIMINAR
export const deleteUsuario = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from usuario where idusuario=$1', [id]);

        return res.status(200).json(
            `Usuario ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//ACTUALIZAR
export const updateUsuario = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { username, password } = req.body;
        await pool.query('update usuario set username=$1, password=$2 where idusuario=$3', [username, password, id]);

        return res.status(200).json(
            `Usuario ${ username } se ha actualizado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//CREAR
export const createUsuario = async(req, res) => {
    try {
        const { idusuario, username, password} = req.body;
        const pass = await helpers.encryptPassword(password);
        await pool.query('insert into usuario(idusuario, username, password) values($1, $2, $3)', [idusuario, username, pass]);

        return res.status(200).json(
            `Usuario ${ username } se ha creado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}