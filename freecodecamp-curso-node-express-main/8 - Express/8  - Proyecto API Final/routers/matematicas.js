/*
* Curso de Node.js y Express.
* Creado para freeCodeCamp en Español.
* Por: Estefania Cassingena Navone. 
*/

const express = require('express');

const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());
const app = express();


routerMatematicas.get('/', (req, res) => {
  res.json(matematicas);
});
  
routerMatematicas.get('/:tema', (req, res, next) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter(curso => curso.tema === tema);
  
  if (resultados.length === 0) {
    return next()
  }
  res.json(resultados);
  
});

routerMatematicas.get('/:titulo', (req, res, next) => {
  const titulo = req.params.titulo;
  const resultados = matematicas.filter(curso => curso.titulo === titulo);
  
  if (resultados.length === 0) {
    return next()
  }
  res.json(resultados);
  
});

routerMatematicas.get('/:nivel', (req, res) => {
  const nivel = req.params.nivel;
  const resultados = matematicas.filter(curso => curso.nivel == nivel);
  
  if (resultados.length === 0) {
    return res.status(404).send({estatus: 'vacio'})
  }
  res.json(resultados);
});

routerMatematicas.post('/', (req, res) => {
  let cursoNuevo = req.body;
  matematicas.push(cursoNuevo);
  res.json(matematicas);
});

routerMatematicas.put('/:id', (req, res) => {
  let cursoNuevo = req.body;
  let id = req.params.id
  let index = matematicas.findIndex(curso => curso.id == id)
  if(id => 0){
    matematicas[index] = cursoNuevo
  }else{
    res.status(404).send(`Hubo un error , no se pudo actualizar el curso de id ${id}`)
  }
  res.json(matematicas);
});

routerMatematicas.patch('/:id',(req,res) => {
  let infoNueva = req.body
  let id = req.params.id
  let index = matematicas.findIndex(curso => curso.id == id)
  if(index >= 0){
    let infoVieja = matematicas[index]
    Object.assign(infoVieja,infoNueva)
  }else{
    res.status(404).send(`Hubo un error , no se pudo actualizar el curso de id ${id}`)
  }
  res.json(matematicas);
})

routerMatematicas.delete('/',(req,res) => {
  console.log(matematicas.length)
  matematicas.splice(0,matematicas.length)
  res.json(matematicas)
})

routerMatematicas.delete('/:id',(req,res) => {
  let id = req.params.id
  let index = matematicas.findIndex(curso => curso.id == id)

  index >=0
  ?matematicas.splice(index,1)
  :res.status(404).end()

  res.json(matematicas)
})

module.exports = routerMatematicas;