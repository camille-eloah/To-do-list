import './App.css'

import Dashboard from "./components/Dashboard"
import Theme from "./components/Theme"
import dados from './components/Dados'

function App() {
  return (
    <>
    
    <Theme>
      <Dashboard tasks={dados}/>
    </Theme>

    </>
  )
}

export default App
