import { ChangeEvent, FormEvent, useState } from 'react'

import './styles/style.css'
import { isValidEmail } from './utils/isValidEmail'

type DataProps = {
  fullname: string
  email: string
  marital_status: string
  genre: string
}

function App () {
  const [data, setData] = useState<DataProps>({
    fullname: '',
    email: '',
    marital_status: '',
    genre: ''
  })

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setData(prev => {
      const newData = { ...prev, [name]: value }
      return newData
    })
  }

  const calculateProgress = (): number => {
    let value = 0
    const amountToAdd = 25
    if (data.fullname) {
      const explodeFullname = data.fullname.split(' ')
      if (explodeFullname[1] && explodeFullname[1].length > 1) {
        value += amountToAdd
      }
    }
    if (data.email) {
      if (isValidEmail(data.email)) {
        value += amountToAdd
      }
    }
    if (data.marital_status) value += amountToAdd
    if (data.genre) value += amountToAdd

    return value
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    alert('Formulario enviado com sucesso')
    setData({
      fullname: '',
      email: '',
      marital_status: '',
      genre: ''
    })
  }

  return (
    <div className='App'>
      <h1>Progresso Do Formulário</h1>

      <main>
        {
          (data.fullname || data.email) && (
            <div className="bar-container">
              <div className="bar" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          )
        }
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor=''>Nome Completo</label>
            <input
              type="text"
              name="fullname"
              placeholder="Seu nome completo"
              value={data.fullname}
              onChange={handleChangeValue}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Seu melhor email"
              value={data.email}
              onChange={handleChangeValue}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Estado Civil</label>
            <select
              name="marital_status"
              value={data.marital_status}
              onChange={handleChangeValue}
            >
              <option value=''>- selecione...</option>
              <option value='single'>Solteiro</option>
              <option value='married'>Casado</option>
              <option value='divorced'>Divorciado</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor=''>Gênero</label>
            <div className='radios-container'>
              <span>
                <input
                  type='radio'
                  name="genre"
                  value="male"
                  onChange={handleChangeValue}
                  checked={data.genre === 'male'}
                /> Masculino
              </span>
              <span>
                <input
                  type='radio'
                  name="genre"
                  value="female"
                  onChange={handleChangeValue}
                  checked={data.genre === 'female'}
                /> Feminino
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={calculateProgress() !== 100}
          >
            Enviar Formulário
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
