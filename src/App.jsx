// imports
import './App.css'
import Header from './components/Header/Header'
import Creature from './components/Creature/Creature'
import CreatureForm from './components/CreatureForm/CreatureForm'
import Footer from './components/Footer/Footer'

import { useState, useEffect } from 'react'

function App() {
  // logic presentation

  // 1) Función asíncrona dentro de mi componente que pida a backend (una API REST) los datos con la función fetch
  async function getData() {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character")
      const data = await response.json()
      //console.log(data)

      // 2) Dicha función, cuando reciba y desempaquete los datos, actualizará el estado del componente
      if (data?.results) {
        setCreatures(data.results)
      }
      else { // Manejando los errores notificados por la API
        setErrorData(true)
      }
    }
    catch { // Manejando las excepciones posibles
      setErrorData(true)
    }
  }

  // let darkMode = false
  const [darkMode, setDarkMode] = useState(false)
  const [creatures, setCreatures] = useState([])
  const [errorData, setErrorData] = useState(false)

  // Función para añadir una nueva criatura
  const addCreature = (newCreature) => {
    setCreatures(prevCreatures => [newCreature, ...prevCreatures])
  }

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

      {/* ---------- FORMULARIO ---------- */}
      <CreatureForm onAddCreature={addCreature} />

      {/* ---------- MAIN ---------- */}

      {
      // 3) El componente en su vista:

      creatures.length > 0 // El array tiene datos???
      ?
      // 3.b) Cuando haya datos, con un .map recorre el estado con los datos y los pinta.

      // Para cada criatura del array de objetos
      /*
      {
        id: number,
        name: string,
        image: string,
        description: string
        }
        */
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
        // 3.b) Si no hay datos, da un mensaje al usuario adecuado
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
