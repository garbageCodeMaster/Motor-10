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

const checkQuizById = async (id, answers) => {
    const response = await fetch(API_URL + '/quiz/' + id, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
    })
  
    if (response.ok) { 
        return await response.json()
    } else {
        return []
    }
}
  
const QuizAPI = {
    getQuizzes,
    getQuizById,
    checkQuizById
}

export default QuizAPI
