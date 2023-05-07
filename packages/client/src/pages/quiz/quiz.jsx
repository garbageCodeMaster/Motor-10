import React, { useState, useEffect } from 'react'
import { json, useParams } from 'react-router-dom'
import { Button } from '../../components'

import img from '@assets/history1.png'
import styles from './quiz.module.css'
import appStyles from '../../app/App.css'
import QuizAPI from '../../api/quiz'

const Quiz = () => {
  const { id } = useParams();

  const [allQuestions, setAllQuestions] = useState(null)
  const [currentQuestions, setCurrentQuestion] = useState(0)
  const [myAnswers, setMyAnswers] = useState([])
  const [showScore, setShowScore] = useState(false)
  const [value, setValue] = useState(null);
    
  function changeHandler(event) {
    setValue(event.target.value)

  }
  
  const toNextQuestion = () => {
    console.log('next question')
    if (value === null){
      return 
    }
    setMyAnswers([...myAnswers, value])
    const nextQuestion = currentQuestions + 1
    console.log(value)
    if (nextQuestion < Object.keys(allQuestions.Questions).length){
      setCurrentQuestion(nextQuestion)
    }
    else{
      console.log(myAnswers)
      
    }
  }

  
  useEffect(() => {
    const fetchData = async () => {
      const result = await QuizAPI.getQuizById(id)
      console.log(result)
      setAllQuestions(result)
    }
    
    fetchData() 
  }, []) 

  if (!allQuestions) {
    return "Loading..."
  }
    
  return (
    <div className="card">
      <div className={styles.cardHeader}>
        <div className={styles.quizHeader}>
          <h1 className={styles.quizName}>{allQuestions.title}</h1>
          <div className={styles.quizText}>Ответе на все вопросы ниже</div>
        </div>

        <div className={styles.quizTimer}>
          <div className={styles.quizTimerText}>Таймер: </div>
          <div className={styles.quizTimerValue}>{allQuestions.timeLimit}</div>
        </div>
      </div>

      <div className={styles.quizGame}>
        <div className={styles.quizGameImg}>
          <img src={img}/>
        </div>

        <div className={styles.quizGameQuestions}>
          <h4 className={styles.questionName}>Вопрос:{currentQuestions + 1}/{Object.keys(allQuestions.Questions).length}</h4>
          <div className={styles.questionText}>{allQuestions.Questions[currentQuestions].text}</div>
        </div>

        <div className={styles.quizGameAnswers}>
          <h3 className={styles.answerHeader}>Выберите вариант ответ:</h3>
          <div className={styles.answerContent}>
          {allQuestions.Questions[currentQuestions].Answers.map(answer =>  (
            <div className={styles.answer}>
              <input 
              type="radio"
              name="radio" 
              value={answer.id}
			        checked={value == answer.id ? true : false}
              onClick={changeHandler}
              />
              <label for="" className={styles.answerText}>{answer.text}</label>
            </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.quizNextButton} onClick={toNextQuestion}>
        <Button 
        >Next Question</Button>
      </div>
    </div>
  )
}

export default Quiz