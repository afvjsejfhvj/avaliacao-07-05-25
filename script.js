const express = require('express');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const { myReadFile , getLog , newLog } = require('./storage-functions')
const app = express()  // inicializa executando a função express()
const PORT = 8000 // reserva a porta para rodar o servidor

app.use(express.text())


app.get('/logs', (req, res) => {
    myReadFile('./logs.txt', res)
})

app.get('/logs/:id', (req, res) => {
    const id = String(req.params.id);
    if (!id) return res.status(404).send('You must pass a valid ID');
    
    getLog('./logs.txt', id)
        .then(log => res.status(200).send(log))
        .catch(err => res.status(500).send(err));
})

app.post('/logs', (req, res) => {
    if (!req.body) return res.status(400).send('You must pass a name in the body');

    newLog('./logs.txt' , req.body).then(log => {
        res.status(201).send(log);
    }).catch(err => {
        res.status(500).send(err);
    });
})





app.listen(PORT, () => { console.log(`Servidor online na porta ${PORT}`) })