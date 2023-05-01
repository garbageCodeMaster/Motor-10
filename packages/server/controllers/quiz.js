import { Quiz, Question, Answer } from '../models/index.js'

export const allQuizzes = async (req, res) => {
  const quizzes = await Quiz.findAll()

  if (quizzes) {
    res.status(200).json(quizzes)
  } else {
    res.status(404).json({ reason: 'no quizzes found' })
  }
}


export const allQuizQuestions = async (req, res) => {
  const { id } = req.params

  const quiz = await Quiz.findByPk(id, { 
    include: {
      model: Question,
      include: {
        model: Answer,
        attributes: { exclude: ['isCorrect'] }
      }
    }
  })

  if (quiz) {
    res.status(200).json(quiz)
  } else {
    res.status(404).json({ reason: 'no questions found' })
  }
}

export const correctQuizAnswers = async (req, res) => {
  const { id } = req.params
  //const clientAnswers = req.body

  const correctAnswers = await Question.findAll({
    where: {
      quiz_id: id,
    },
    include: { 
      model: Answer, 
      where: {
        is_correct: true,
      }
    }
  })

  if (correctAnswers) {
    //const mistakes = correctAnswers.filter((ans, i) => ans.text !== clientAnswers[i])

    //if (mistakes.length) {
      //
      res.status(200).json(correctAnswers)
    //} else {
    //  res.status(200).json(correctAnswers)
    //}
  } else {
    res.status(404).json({ reason: 'no correct answer found' })
  }
}
