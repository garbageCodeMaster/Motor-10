import { Router } from 'express'
import { allQuizzes, allQuizQuestions, correctQuizAnswers } from '../controllers/quiz.js'

const quizRouter = Router()

quizRouter.get('/', allQuizzes)
.get('/:id', allQuizQuestions)
.post('/:id', correctQuizAnswers)

export default quizRouter
