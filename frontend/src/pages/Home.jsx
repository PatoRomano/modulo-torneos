import React from 'react'
import Card from '../components/Card'
import Image from '../assets/soccer.jpg'
import MainTitle from '../components/MainTitle'

function App() {

  return (
    <div>
        <MainTitle title="Elige tu deporte!" />
        <Card imageSrc={Image} title="Futbol" />
    </div>
  )
}

export default App
