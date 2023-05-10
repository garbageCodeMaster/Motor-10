import { API_URL } from '../constants'

const getQuizzes = async () => {
    const response = await fetch(API_URL + '/quiz')

    if (response.ok) { 
        const json = await response.json()

        return json
    } else {
        return []
    }
}

const getQuizById = async (id) => {
    const response = await fetch(API_URL + '/quiz/' + id)
  
    if (response.ok) { 
        return await response.json()
    } else {
        return []
    }
}
  
const QuizAPI = {
    getQuizzes,
    getQuizById
}

export default QuizAPI
