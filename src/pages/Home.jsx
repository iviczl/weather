import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Home() {
  const selectedSettlement = useSelector(
    (state) => state.settlement.selectedSettlement
  )
  const navigate = useNavigate()
  return (
    <div>
      <p>{selectedSettlement}</p>
      <button onClick={() => navigate("/search")}>+</button>
    </div>
  )
}
