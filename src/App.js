import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [anterior, setAnterior] = useState(false)
  const [siguiente, setSiguiente] = useState(false)


  useEffect(() => {
    
    const consultando = async () =>{
      if(busqueda === '') return

    const imagenerPorPagina = 30;

    const key = "20734390-e60f73e93924ee72cb31b946f"

    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenerPorPagina}&page=${paginaActual}`

    const res = await fetch(url)
    const contenido = await res.json()

    setTotalPaginas(Math.ceil(contenido.totalHits / imagenerPorPagina))

    setImagenes(contenido.hits)

    setSiguiente(true)

    //mover a la parte superior
    document.querySelector('.jumbotron').scrollIntoView({behavior: "smooth"})


    }
    consultando()
  }, [busqueda, paginaActual])

  useEffect(() => {
    
   setAnterior(true)
   setSiguiente(true)

   if(paginaActual === 1) setAnterior(false)
   if(paginaActual === totalPaginas) setSiguiente(false)
    
   //eslint-disable-next-line
  }, [paginaActual])

  const paginaAnterior = () =>{
    
    const nuevaPaginaActual = paginaActual - 1
    setPaginaActual(nuevaPaginaActual)

  }

  const paginaSiguiente = () =>{
    
    if(paginaActual === totalPaginas) return

    const nuevaPaginaActual = paginaActual + 1
    setPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        {anterior ? <button
          type="button" 
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >&#60; Anterior</button>: null}

        {siguiente ? <button
          type="button" 
          className="btn btn-info"
          onClick={paginaSiguiente}
        >Siguiente &#62;</button> : null}
      </div>
    </div>
  );
}

export default App;
