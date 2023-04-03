import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './components/App'
import Profile from './pages/profile/profile'
import Quiz from './pages/quiz/quiz'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Profile />
    <Quiz />
  </React.StrictMode>
)
