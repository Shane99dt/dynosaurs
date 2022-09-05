const { default: slugify } = require('slugify')
const { Dynosaur } = require('../models/index')

const verifyDynosaur = async (req, res, next) => {
  const { id } = req.params
  try{
    const dynosaur = await Dynosaur.findOne({
      where: {
        id
      }
    })

    if(dynosaur){
      req.id = id
      req.dynosaur = dynosaur
      next()
    }else{
      res.status(404).json('Dynosaur not found')
    }
  }catch(e){
    res.status(500).json("Internal server error")
  }
}

const checkIfExists = async (req, res, next) => {
  const { name } = req.body
  // const slugifiedReqName = slugify(name, {lower: true})

  try{
    const dynosaur = await Dynosaur.findOne({
      where: {
        name
      }
    })

    if(!dynosaur){
      next()
    }else{
      res.status(409).json('Dynosaur already exists')
    }

  }catch(e){
    res.status(500).json('Internal server error')
  }
}

const checkIfExistsUpdate = async (req, res, next) => {
  const { name } = req.body
  const { id } = req.params
  // const slugifiedReqName = slugify(name, {lower: true})

  try{
    const dynosaur = await Dynosaur.findOne({
      where: {
        name
      }
    })

    const dynosaurUpdate = await Dynosaur.findOne({
      where: {
        id
      }
    })

    if(!dynosaur || name === dynosaurUpdate.name){
      next()
    }else{
      res.status(409).json('Dynosaur already exists')
    }

  }catch(e){
    res.status(500).json('Internal server error')
  }
}


module.exports = {
  verifyDynosaur,
  checkIfExists,
  checkIfExistsUpdate
}