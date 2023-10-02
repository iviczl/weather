import { NavLink } from 'react-router-dom'
export default function NavBar() {
  return (
    <p className='nav-bar'>
      <NavLink to='/' className='nav-link'>
        {'<'}
      </NavLink>
    </p>
  )
}
