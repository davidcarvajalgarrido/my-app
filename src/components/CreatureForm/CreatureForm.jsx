import { useState } from 'react'
import './CreatureForm.css'

function CreatureForm({ onAddCreature }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validación básica
    if (name.trim() === '' || description.trim() === '') {
      alert('Por favor, completa todos los campos')
      return
    }

    // Crear nueva criatura
    const newCreature = {
      id: Date.now(), // ID simple basado en timestamp
      name: name.trim(),
      image: '', // Imagen por defecto
      species: description.trim() // Usando species para mantener consistencia con la API
    }

    // Llamar a la función del componente padre
    onAddCreature(newCreature)

    // Limpiar el formulario
    setName('')
    setDescription('')
  }

  return (
    <form className="creature-form" onSubmit={handleSubmit}>
      <h3>Añadir Nueva Criatura</h3>
      
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la criatura"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la criatura"
          rows="3"
        />
      </div>

      <button type="submit" className="submit-btn">
        Añadir Criatura
      </button>
    </form>
  )
}

export default CreatureForm