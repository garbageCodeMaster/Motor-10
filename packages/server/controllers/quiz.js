import { Quiz, Question, Answer } from '../models/index.js'

export const allQuizzes = async (req, res) => {
  const quizzes = await Quiz.findAll()

  if (quizzes) {
    res.status(200).json({ quizzes })
  } else {
    res.status(404).json({ reason: 'no quizzes found' })
  }
}


export const allQuizQuestions = async (req, res) => {
  const { id } = req.params

  const quiz = await Quiz.findByPk(id, { 
    include: {
      model: Question,
      include: Answer
    }
  })

  if (quiz) {
    res.status(200).json({ quiz })
  } else {
    res.status(404).json({ reason: 'no questions found' })
  }
}

export const correctQuizAnswers = async (req, res) => {
  const { id } = req.params

  const answers = await Answer.findAll({
    where: {
      is_correct: true,
    },
    include: { 
      model: Question, 
      where: {
        quiz_id: id,
      }
    }
  })

  if (answers) {
    res.status(200).json({ answers })
  } else {
    res.status(404).json({ reason: 'no correct answer found' })
  }
}
