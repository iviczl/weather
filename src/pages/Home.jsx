import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {
  const selectedCapital = useSelector((state) => state.capital.selectedCapital)
  const navigate = useNavigate()

  return (
    <div>
      <p
        className='selected-capital nav-block'
        onClick={() => navigate('/data')}
      >
        {selectedCapital}
      </p>
      <button className='plus' onClick={() => navigate('/search')}>
        +
      </button>
    </div>
  )
}
