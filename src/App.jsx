// imports
import './App.css'
import Header from './components/Header/Header'
import Creature from './components/Creature/Creature'
import Footer from './components/Footer/Footer'

import { useState, useEffect } from 'react'

function App() {
  // logic presentation

  async function getData() {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character")
      const data = await response.json()
      //console.log(data)
  
      if (data?.results) {
        setCreatures(data.results)
      }
      else {
        setErrorData(true)
      }
    }
    catch {
      setErrorData(true)
    }
  }

  // let darkMode = false
  const [darkMode, setDarkMode] = useState(false)
  const [creatures, setCreatures] = useState([])
  const [errorData, setErrorData] = useState(false)

  useEffect(() => {

    getData()
    
  }, [])

  // renderization
  return (
    <div className={ darkMode === true ? "dark-mode" : "light-mode" }>
      <button
        className={ darkMode !== true ? "dark-mode" : "light-mode" }
        onClick={() => {
          setDarkMode(!darkMode)
        }}
      >
        Modo { darkMode === true ? "oscuro" : "claro" }
      </button>

      {/* ---------- HEADER ---------- */}
      <Header />

      {/* ---------- MAIN ---------- */}

      {
        // Para cada criatura del array de objetos
        /*
        {
          id: number,
          name: string,
          image: string,
          description: string
        }
        */
        creatures.length > 0 // El array tiene datos???
        ?
        creatures.map((creature, index) => {
        // creatures.map(({id, name, image, description}) => {
          return (
            <Creature
              id={creature.id}
              name={creature.name}
              // name={name}
              image={creature.image}
              description={creature.species}
              key={index}
            />
          )
        })
        :
        <div>
          <p>No hay datos</p>

          <button
            className={ darkMode !== true ? "dark-mode" : "light-mode" }
            onClick={() => {
              getData()
            }}
          >
            Obtener datos
          </button>

          { errorData && <p>Hay error</p> }
        </div>

      }

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </div>
  )
}

// exports
export default App
