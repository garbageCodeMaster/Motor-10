import { Routes, Route } from 'react-router-dom'

import Preview from './preview/preview'
import Quiz from './quiz/quiz'
import SelectTopic from './selectTopic/selectTopic'


const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectTopic/>} />
            <Route path="/quiz/:id" element={<Preview/>} />
            <Route path="/game/:id" element={<Quiz/>} />
        </Routes>
    )
}

export default AppRouting
