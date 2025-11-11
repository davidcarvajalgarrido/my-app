// imports
import './App.css'
import Header from './components/Header/Header'
import Creature from './components/Creature/Creature'
import Footer from './components/Footer/Footer'

import { useState } from 'react'

function App() {
  // logic presentation

  // let darkMode = false
  const [darkMode, setDarkMode] = useState(false)
  const [creatures, setCreatures] = useState([
    {
      name: "Quimera",
      image: "https://linguisimo.com/wp-content/uploads/Proyecto-nuevo-2023-12-23T121419-093.webp",
      description: "La quimera es un monstruo de tres cabezas: cabra, león y dragón"
    },
    /*{
      name: "Medusa",
      image: "https://historyhogs.com/wp-content/uploads/2023/04/Medusa-.jpg",
      description: "La medusa es una mujer con serpientes en la cabeza"
    }*/
  ])

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
              description={creature.description}
              key={index}
            />
          )
        })
        :
        <p>No hay datos</p>
      }

      {/* ---------- FOOTER ---------- */}
      <Footer />
    </div>
  )
}

// exports
export default App
