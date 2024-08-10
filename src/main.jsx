import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import pokemon from 'pokemontcgsdk'

pokemon.configure({apiKey: 'b62acc19-1d2c-42dd-a220-99355ea7bf60'})

pokemon.card.where({ q: 'types:water', pageSize: 10, page: 3 })
.then(result => {
    console.log(result.data) // "Blastoise"
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
