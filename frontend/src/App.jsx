import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './App.style.js'
import { Router } from './Router'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  )
}

export default App