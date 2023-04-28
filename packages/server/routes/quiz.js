import { Router } from 'express'
import { allQuizzes, allQuizQuestions, correctQuizAnswers } from '../controllers/quiz.js'

const quizRouter = Router()

quizRouter.get('/', allQuizzes)
.get('/:id', allQuizQuestions)
.get('/:id/answers', correctQuizAnswers)

export default quizRouter
