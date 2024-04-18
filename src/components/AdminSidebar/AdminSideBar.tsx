import React from 'react'
import { Link } from 'react-router-dom'

import './AdminSideBar.scss'
const AdminSideBar = () => {
    return (
        <div className='admin-sidebar'>
            <Link to={'/admin'} className='link'>PINSOFT<span style={{ color: "#ee5e40" }}>RECIPE</span></Link>
            <div className='admin-sidebar-content'>
                <Link to={'/admin'} className='admin-sidebar-link' >Tarifler </Link>
                <Link to={'/admin/kullanicilar'} className='admin-sidebar-link'>Kullanıcılar</Link>
                <Link to={'/admin/yorumlar'} className='admin-sidebar-link' >Yorumlar</Link>
            </div>
        </div>
    )
}

export default AdminSideBar