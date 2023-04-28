import { API_URL } from '../constants'

const getQuizzes = async () => {
    const response = await fetch(API_URL + '/quiz')

    return await response.json()
}

const getQuizById = async (id) => {
    const response = await fetch(API_URL + '/quiz/' + id)
  
    return await response.json()
}
  

const QuizAPI = {
    getQuizzes,
    getQuizById
}

export default QuizAPI
