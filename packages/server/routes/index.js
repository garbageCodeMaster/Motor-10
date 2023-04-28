import express, { Router } from 'express'
import quizRouter  from './quiz.js'
//import { postRouter } from './posts'
//import { commentRouter } from './comment'

const apiRoutes = Router()

apiRoutes.use('/quiz', quizRouter)
//apiRoutes.use('/posts', postRouter)
//apiRoutes.use('/comments', commentRouter)
//apiRoutes.use('/', proxyMiddleware)

export default apiRoutes 
