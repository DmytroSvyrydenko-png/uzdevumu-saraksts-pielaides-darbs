import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import { Header } from './components/Header/Header'
import { TaskListPage } from './containers/TaskListPage/TaskListPage'
import { Footer } from './components/Footer/Footer'
import { LoginPage } from './containers/LoginPage/LoginPage'
import { useState } from "react"
import { ErrorPage } from "./containers/ErrorPage/ErrorPage"


export function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(localStorage.getItem('userName'));


  return (
    <Router>
      <div className="App">
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <main>
          <Routes>
            <Route
              exact path="/"
              element={
                isLoggedIn ? <Navigate to="/tasks" /> : <Navigate to="/login" />
              }
            />

            <Route
              exact
              path="/login"
              element={
                !isLoggedIn ?
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  /> : <Navigate to="/tasks" />
              }
            />

            <Route
              exact
              path="/tasks"
              element={isLoggedIn ? <TaskListPage /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}


