import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {
  const selectedCapital = useSelector((state) => state.capital.selectedCapital)
  const navigate = useNavigate()

  return (
    <div>
      <p onClick={() => navigate('/data')}>{selectedCapital}</p>
      <button onClick={() => navigate('/search')}>+</button>
    </div>
  )
}
