import React, { useState } from 'react'
import { MdCancel } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import './RecipeSideBar.scss'
const RecipeSideBar = () => {
  const [sidebarVisibility, setSideBarVisibility] = useState<boolean>(false);

  return (
    <div className="RecipeSideBar">
      <button onClick={() => setSideBarVisibility(!sidebarVisibility)}><FaBars /></button>
      {sidebarVisibility && (
        <div className='recipe-sidebar-container'>
          <div className='sidebar-content'>
            <button onClick={() => setSideBarVisibility(!sidebarVisibility)} className='sidebar-cancel-btn'><MdCancel /></button>
            <div className='search-container'>
              <input type="text" />
              <p className='search-text'>Arama</p>
            </div>
            <select name="" id="">
              <option value="10dk">10dk</option>
            </select>
            <select name="" id="">
              <option value="pirinç">kahvaltı</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeSideBar
