import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import Profile from './pages/profile/profile'
import Quiz from './pages/quiz/quiz'
import Layout from './components/layout/layout'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <Quiz></Quiz>
    </Layout>
  </React.StrictMode>
)
