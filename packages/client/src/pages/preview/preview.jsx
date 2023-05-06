import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

import { Button } from '../../components'

import styles from './preview.module.css'
import appStyles from '../../app/App.css'
import logo from '../../assets/majimagoro.jpg'

import QuizAPI from '../../api/quiz'

const Preview = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await QuizAPI.getQuizById(id)

      setQuiz(result)
    }
    
    fetchData()
  }, [])

  return (
    <div className="card">
      <div className={styles.head}>
        {quiz.title}
      </div>
      <div className={styles.head2}>
        read the following instruction
      </div>
      <div className={styles.flex}>
        <div className={styles.border}>
          <img className={styles.pictur} src={logo}/>
        </div>
        <div className={styles.border}>
          <div className={styles.flex2}>
            <div className={styles.undhead}>
              Data:
            </div>
            <div>
              {quiz.createdAt}
            </div>
          </div>
          <div className={styles.flex2}>
            <div className={styles.undhead}>
              Time limit:
            </div>
            <div>
            {quiz.timeLimit + ' min'}
            </div>
          </div>
          <div className={styles.flex2}>
            <div className={styles.undhead}>
              Attempts:
            </div>
            <div>
              Once
            </div>
          </div>
          <div className={styles.flex2}>
            <div className={styles.undhead}>
              Points:
            </div>
            <div>
              {quiz.points + ' points'}
            </div>
          </div>
        </div> 
      </div>
      <div className={styles.underpic}>
        Instructions
      </div>
      <div className={styles.stext}>
      {quiz.description}
      <br />
      <br />
      This quiz consists of 5 multiple-choice questions. To be successful with the quizzes, its important to conversant with the topics. Keep the following in mind:
      <br />
      <br />
      Timing - You need to complete each of your attempts in one sitting, as you are allotted 30 minutes to each attempt.
      Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.
      <br />
      <br />
      To start, click the "Start" button. When finished, click the "Submit " button. 
      </div>
        <Link to={`/game/${quiz.id}`}><div className={styles.forbaton}><Button>Start</Button></div></Link>
    </div>
  )
}

//<div className={styles.profile}>profile</div>

export default Preview
