import { Link } from 'react-router-dom'
import './Navbar.scss'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-logo-container'>
        <p className='navbar-logo-text'><span style={{color:"#ee5e40"}}>PINSOFT</span>RECIPE</p>
      </div>
      <div>
        <Link to={'/'} style={{marginRight:"10px"}} className='navbar-link'>Anasayfa</Link>
        <Link to={'/yemek-tarifleri'} className='navbar-link'>Yemek Tarifleri</Link>
      </div>
      <button className='navbar-btn'>Giriş Yap</button>
    </div>
  )
}

export default Navbar
