import React from 'react'
import { Button } from '../../components'

import img from '@assets/history1.png'
import styles from './quiz.module.css'
import appStyles from '../../app/App.css'

const Quiz = () => {

  return (
    <div className="card">
      <div className={styles.cardHeader}>
        <div className={styles.quizHeader}>
          <h1 className={styles.quizName}>History Quiz</h1>
          <div className={styles.quizText}>Answer the question below</div>
        </div>

        <div className={styles.quizTimer}>
          <div className={styles.quizTimerText}>Timer:</div>
          <div className={styles.quizTimerValue}>22:34 Mins</div>
        </div>
      </div>

      <div className={styles.quizGame}>
        <div className={styles.quizGameImg}>
          <img src={img}/>
        </div>

        <div className={styles.quizGameQuestions}>
          <h4 className={styles.questionName}>Question 1/5</h4>
          <div className={styles.questionText}>Guy Bailey, Roy Hackett and Paul Stephenson made history in 1963, as part of a protest against a bus company that refused to employ black and Asian drivers in which UK city?</div>
        </div>

        <div className={styles.quizGameAnswers}>
          <h3 className={styles.answerHeader}>Choose answer</h3>
          <div className={styles.answerContent}>
            <div className={styles.answer}>
              <input type="radio" checked/>
              <label for="" className={styles.answerText}>London</label>
            </div>

            <div className={styles.answer}>
              <input type="radio" />
              <label for="" className={styles.answerText}>Edinburgh</label>
            </div>

            <div className={styles.answer}>
              <input type="radio" />
              <label for="" className={styles.answerText}>Liverpool</label>
            </div>

            <div className={styles.answer}>
              <input type="radio" />
              <label for="" className={styles.answerText}>Canary Wharf</label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.quizNextButton}>
        <Button>Next Question</Button>
      </div>
    </div>
  )
}

export default Quiz
