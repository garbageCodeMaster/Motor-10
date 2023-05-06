import { Sequelize } from 'sequelize'
//import { User, Quiz, Question, Answer } from './models/index.js'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions = {
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
}

export const sequelize = new Sequelize('quiz_db', 'quiz_user', '11', {
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
  define: { timestamps: false }
})

//await sequelize.sync()
export const createClientAndConnect = async () => {
    // try {
    //   await sequelize.authenticate()
  
    //   await sequelize.sync()
    // } catch (error) {
    //   console.error(error)
    // }

    // return sequelize
}
