import { Link } from 'react-router-dom'
import './Navbar.scss'
import { useEffect, useState } from 'react';
import { UserType } from '../../Types/Types';
import { IoMdArrowDropup } from 'react-icons/io';
const Navbar = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleOpenModal = () => {
      setModalVisibility(!modalVisibility)
  }
  const [userId, setUserId] = useState<number>();
  const [loggedInUser, setLoggedInUser] = useState<UserType | undefined>();
  console.log(userId);
  const getUserById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`)
      if (response.ok) {
        const data: UserType = await response.json();
        setLoggedInUser(data)
      }
    } catch (error) {
      console.error(error);

    }
  }
  const logout = () =>{
    localStorage.setItem('userId',"")
    localStorage.setItem('userToken',"")
    setLoggedInUser(undefined);
    setModalVisibility(false)
}
  useEffect(() => {
    const storedData = localStorage.getItem('userId');
    if (storedData && typeof storedData === 'string') {
      const parsedUserId = parseInt(storedData, 10);
      if (!isNaN(parsedUserId)) {
        setUserId(parsedUserId);
      }
    }
    getUserById();
  }, [userId]);
  return (
    <div className='navbar'>
      <div className='navbar-logo-container'>
        <Link to={'/'}><p className='navbar-logo-text'><span style={{ color: "#ee5e40" }}>PINSOFT</span>RECIPE</p></Link>
      </div>
      <div>
        <Link to={'/'} style={{ marginRight: "10px" }} className='navbar-link'>Anasayfa</Link>
        <Link to={'/yemek-tarifleri'} className='navbar-link'>Yemek Tarifleri</Link>
      </div>
      <div className='user-container'>
                {loggedInUser && loggedInUser.base64image ? (
                    <button onClick={() => handleOpenModal()}>
                        <img src={loggedInUser.base64image} alt={loggedInUser.username} className='user-logo' />
                    </button>
                ) : (
                    <button onClick={() => handleOpenModal()}>
                        <p style={{ marginRight: "20px" }}>{loggedInUser?.username}</p>
                    </button>
                )}
                {!loggedInUser &&(
                    <Link to={"/giris-yap"} className='navbar-btn'>Giriş Yap</Link>
                )}
                {modalVisibility && (
                    <div className={`navbar-user-modal ${modalVisibility ? 'show' : ''}`}>
                        <Link to={'/hesabim'}>Hesabım</Link> <br />
                        <Link to={'/tariflerim'}>Tariflerim</Link> <br />
                        {loggedInUser?.role.name === "admin" &&(
                            <Link to={'/admin'}>Admin</Link>
                        )}
                        <button onClick={logout}>Çıkış Yap</button>
                        <IoMdArrowDropup className='modal-arrow' />
                    </div>
                )}
            </div>
    </div>
  )
}

export default Navbar
