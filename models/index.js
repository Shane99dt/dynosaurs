const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('dynosaurs', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
  // logging TRUE shows every request that made to the db
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