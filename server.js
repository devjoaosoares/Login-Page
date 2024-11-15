import express from 'express';
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())
//Express Params

const prisma = new PrismaClient()
//Prisma Params

app.post('/usuarios', async (req, res) => {
  try {                                                                 //Tenta Utilizar a QUery de Criar Usuário
    await prisma.user.create({                                          //Query Criar Usuário
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)                                      //retorna status de criacao com sucesso e retorna o corpo da requisição
    } 
    catch {
        res.status(500).json({ message: 'Error creating user' })        //caso nao consiga criar o usuario, retorna status de erro e mensagem de erro
    }
})
//INSERT Route 


app.get('/usuarios', async (req, res) => {

    let users = []                              //Variavel de recebimento do resultado das querys

    if(req.query){                                             
        users = await prisma.user.findMany({    //Filtra os Usuarios com o metodo Query Params
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        users = await prisma.user.findMany()    //Retorna todos os Usuarios existentes caso não haja query params
    }
    

    res.status(200).json(users)                 //retorna o status de "Tudo certo" e os usuarios

})
//GET Route

app.put('/usuarios/:id', async (req, res) => {
  
    await prisma.user.update({                  //Query de Updaye
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json(req.body)              //retorna status de "Tudo certo" e o usuario atualizado
})
//EDIT Route

app.delete('/usuarios/:id', async (req, res) => {
  
    await prisma.user.delete({                  //Query de Delete
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(req.body)              //Retorna status de "Tudo certo" e o usuario deletado
})
//DELETE Route

app.listen(3000)                                //Porta em que o servidor vai estar

