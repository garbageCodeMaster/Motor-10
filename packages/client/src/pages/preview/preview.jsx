import React from 'react'
import { Button, NavButton } from '../../components'

import styles from './preview.module.css'
import appStyles from '../../app/App.css'
import logo from '../../assets/majimagoro.jpg'


const Preview = () => {

  return (
    <>
      <div className="card">
        <div className={styles.head}>
          History quiz
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
                23/04/2023
              </div>
            </div>
            <div className={styles.flex2}>
              <div className={styles.undhead}>
                Time limit:
              </div>
              <div>
                30 min
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
                200 points
              </div>
            </div>
          </div> 
        </div>
        <div className={styles.underpic}>
          Instructions
        </div>
        <div className={styles.stext}>
        This quiz consists of 5 multiple-choice questions. To be successful with the quizzes, its important to conversant with the topics. Keep the following in mind:
        <br />
        <br />
        Timing - You need to complete each of your attempts in one sitting, as you are allotted 30 minutes to each attempt.
        Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.
        <br />
        <br />
        To start, click the "Start" button. When finished, click the "Submit " button. 
        </div>
          <div className={styles.forbaton}><Button>Start</Button></div>
        </div>
    </>
  )
}

//<div className={styles.profile}>profile</div>

export default Preview
