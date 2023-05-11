import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonBack} from '../../components'

import img1 from '../../assets/topic1.png'
import img2 from '../../assets/topic2.png'
import img3 from '../../assets/topic3.png'
import img4 from '../../assets/topic4.png'

import styles from './selectTopic.module.css'
import QuizAPI from '../../api/quiz'

const SelectTopic = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await QuizAPI.getQuizzes()

      setQuizzes(result)
    }
    
    fetchData()
  }, [])


  const openQuiz = () => {

  }

  return (
    <div className="card">
      <div className={styles.cardHeader}>
        <div className={styles.topicBackButton}>
          <ButtonBack>&#60;</ButtonBack>
        </div>

        <div className={styles.topicHeader}>
          <h1 className={styles.topicName}>Select Topic</h1>
          <div className={styles.topicText}>Featured Category</div>
        </div>
      </div>

      <div className={styles.topic}>
        
      {quizzes.map(quiz => (
        <Link to={`/quiz/${quiz.id}`} className={styles.changeTopic} >
          <img src={quiz.imageUrl ? quiz.imageUrl : img1}/>
          <div className={styles.topicSelectName}>{quiz.title}</div>
        </Link>
      ))}
            {quizzes.map(quiz => (
        <Link to={`/quiz/${quiz.id}`} className={styles.changeTopic} >
          <img src={quiz.imageUrl ? quiz.imageUrl : img1}/>
          <div className={styles.topicSelectName}>{quiz.title}</div>
        </Link>
      ))}
      {quizzes.map(quiz => (
        <Link to={`/quiz/${quiz.id}`} className={styles.changeTopic} >
          <img src={quiz.imageUrl ? quiz.imageUrl : img1}/>
          <div className={styles.topicSelectName}>{quiz.title}</div>
        </Link>
      ))}
        
      </div>

      <div className={styles.topicMoreButton}>
        <Button>More</Button>
      </div>
    </div>
  )
}

export default SelectTopic
