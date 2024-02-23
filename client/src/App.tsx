
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom'
import Lobby from './screens/Lobby'
import Room from './screens/Room'
import './App.css'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Lobby/>}/>
        <Route path='/room/:id' element={<Room/>}/>
      </Routes>
    </>
  )
}

export default App
