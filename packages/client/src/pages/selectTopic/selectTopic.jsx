import React, { useEffect, useState } from 'react'
import { Button, ButtonBack} from '../../components'

import img1 from 'C:/Projects/Motor-10/packages/client/src/assets/topic1.png'
import img2 from 'C:/Projects/Motor-10/packages/client/src/assets/topic2.png'
import img3 from 'C:/Projects/Motor-10/packages/client/src/assets/topic3.png'
import img4 from 'C:/Projects/Motor-10/packages/client/src/assets/topic4.png'

import styles from './selectTopic.module.css'

const SelectTopic = () => {

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

        <div className={styles.changeTopic}>
          <img src={img1}/>
          <div className={styles.topicSelectName}>History</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img2}/>
          <div className={styles.topicSelectName}>Medcine</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img3}/>
          <div className={styles.topicSelectName}>Technology</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img4}/>
          <div className={styles.topicSelectName}>Agriculture</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img1}/>
          <div className={styles.topicSelectName}>History</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img2}/>
          <div className={styles.topicSelectName}>Medcine</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img3}/>
          <div className={styles.topicSelectName}>Technology</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img4}/>
          <div className={styles.topicSelectName}>Agriculture</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img1}/>
          <div className={styles.topicSelectName}>History</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img2}/>
          <div className={styles.topicSelectName}>Medcine</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img3}/>
          <div className={styles.topicSelectName}>Technology</div>
        </div>

        <div className={styles.changeTopic}>
          <img src={img4}/>
          <div className={styles.topicSelectName}>Agriculture</div>
        </div>

      </div>

      <div className={styles.topicMoreButton}>
        <Button>More</Button>
      </div>
    </div>
  )
}

export default SelectTopic
