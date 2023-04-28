import { Routes, Route } from 'react-router-dom'

import Preview from './preview/preview'
import Quiz from './quiz/quiz'
import SelectTopic from './selectTopic/selectTopic'


const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectTopic/>} />
            <Route path="/preview" element={<Preview/>} />
            <Route path="/quiz" element={<Quiz/>} />
        </Routes>
    )
}

export default AppRouting
