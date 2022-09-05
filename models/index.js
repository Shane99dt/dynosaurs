const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dynosaurs', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const connectDb = async () => {
  try{
    await sequelize.authenticate()
    console.log("Connected to the DB")
  }catch(e){
    console.log(e)
  }
}

connectDb()

const Dynosaur = require('./dynosaur')(sequelize)
sequelize.sync({ alter: true })


const db = {
  sequelize,
  Dynosaur
}

module.exports = db