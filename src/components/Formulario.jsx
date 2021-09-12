import React, { useState } from 'react'
import Error from './Error'

function Formulario({setBusqueda}) {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false)

    const buscarImagenes = e =>{
        e.preventDefault()

        //validar
        if(termino.trim() === ''){
            setError(true)
            return
        }
        setError(false)

        //enviar el termino de busqueda hacia el componente principal
        setBusqueda(termino)
    }

    return (
        <form 
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                      type="text" 
                      name="" 
                      id="" 
                      onChange={e => setTermino(e.target.value)}
                      className="form-control form-control-ls" 
                      />
                </div>
                <div className="form-group col-md-4">
                    <input 
                      type="submit" 
                      name="" 
                      id="" 
                      className="btn btn-lg btn-danger btn-block" 
                      />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
        </form>
    )
}

export default Formulario
