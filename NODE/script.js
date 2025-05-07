const { resolveTxt } = require('dns')
const express = require('express') 
const fs = require('fs')
const app = express()
const PORT = 8000 
const { v4: uuidv4 } = require('uuid')
app.use(express.json()) 

app.get('/logs', (req, res)=>{
    fs.readFile('./logs.txt', 'utf-8', (err, data)=> {
        if(err){
            res.status(500).json({msg:"erro no servidor"})
        }
        const dados = JSON.parse(data)
        res.status(200).send(dados)
       
    })
})

app.get('/logs/:id', (req, res)=>{
    const dados = req.body
    fs.readFile('./NODE/logs.txt', 'utf-8', (err, data)=> {
        if(err){
           res.status(500).json({msg:"erro no servidor"})
       }
        const aulas = JSON.parse(data) //converte texto para json
        //cria id 
        dados['id'] = uuidv4()
        //adicionar nova aula no array aulas 
        aulas.push(dados)
        fs.writeFile('./NODE/logs.txt', JSON.stringify(aulas), (err)=>{
            if(err){
                res.status(500).json({msg:"Erro no servidor"})
            }
            res.status(201).json(dados)
        })
    })
})

app.listen(PORT, ()=>{console.log('servidor online')})  