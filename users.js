const express = require('express');
const router = express.Router();
const db = require('../db/db');


router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; //parseInt(req.params.id);
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({error: 'User was not found'});
        }

        res.json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
});


router.post('/', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'Name and email are required'});
    }

    try {
        const check_query = 'SELECT * FROM users WHERE email = ?';
        const [existing] = await db.execute(check_query, [email]);

        if (existing.length > 0) {
            return res.status(409).json( {error: 'Email already exists'});
        }

        const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
        const [result] = await db.execute(query, [name, email]);

        res.status(201).json({message: "User was created successfully", User: result.insertId});
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json( {error: 'Email already exists'});
        }

        res.status(500).json({error: err.message});
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'Name and email are required'});
    }

    try {
        const user_query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(user_query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({error: 'User was not found'});
        }

        const check_query = 'SELECT * FROM users WHERE id != ? AND email = ?';
        const [existing] = await db.execute(check_query, [id, email]);

        if (existing.length > 0) {
            return res.status(409).json( {error: 'Email already exists'});
        }

        const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        const [result] = await db.execute(query, [name, email, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'User was not found'});
        }

        res.json({message: 'User was updated successfully'});
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json( {error: 'Email already exists'});
        }

        res.status(500).json({error: err.message});
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE from users WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({error: 'User was not found'});
        }

        res.json({message: 'User was deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;
