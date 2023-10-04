import { NavLink } from 'react-router-dom'
export default function NavBar() {
  return (
    <div className='nav-bar'>
      <NavLink to='/' className='nav-link'>
        {'<'}
      </NavLink>
    </div>
  )
}
