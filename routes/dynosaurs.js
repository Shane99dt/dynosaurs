const express = require('express')
const { verifyDynosaur, checkIfExists } = require('../middlewares/dynosaursMW')
const app = express()
const { Dynosaur } = require('../models/index')

app.get('/', async (req, res) => {
  try{
    let YearOfAppearanceOrder = req.query.yearOfAppearance
    let order = {}

    if(YearOfAppearanceOrder){
      order = {
        order: [['yearOfAppearance', YearOfAppearanceOrder]]
      }
    }

    const dynosaurs = await Dynosaur.findAll(order)
    res.json(dynosaurs)
  }catch(e){
    res.status(500).json('Internal server error')
  }
})


app.get('/:id', verifyDynosaur, async (req, res) => {
  res.status(201).json(req.dynosaur)
})


app.post('/', checkIfExists, async (req, res) => {
  try{
    const dynosaur = await Dynosaur.create(req.body)
    res.status(201).json(dynosaur)
  }catch(e){
    res.status(500).json("Internal server error")
  }
})


app.put('/:id', verifyDynosaur, checkIfExists, async (req, res) => {
  // with the method use
  // const dynosaur = req.dynosaur
  // dynosaur.set(req.body)
  // await dynosaur.save()
  // res.json(dynosaur)

  // with the method update
  try{
    const { id } = req.params
    await Dynosaur.update( req.body, { where : { id }})
    const dynosaur = await Dynosaur.findOne({ where: { id }})
    res.status(201).json(dynosaur)
  }catch(e){
    res.status(500).json("Internal server error")
  }
})


app.delete('/:id', verifyDynosaur, async (req, res) => {
  const { id } = req.params
  try{
    const dynosaur = await Dynosaur.destroy({ where: { id }})
    res.status(204).json('No content')
  }catch(e){
    res.status(500).json("Internal server error")
  }
})



module.exports = app