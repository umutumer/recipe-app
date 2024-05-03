import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import './RecipeSideBar.scss'
import { Category, RecipeSideBarProps } from '../../Types/Types';
import { FaTrash } from 'react-icons/fa';
const RecipeSideBar: React.FC<RecipeSideBarProps> = ({ setSelectedCategory, setSelectedMaterials, setSearchTerm, selectedMaterials, selectedCategory }) => {
  const [sidebarVisibility, setSideBarVisibility] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [materialInput, setMaterialInput] = useState<string>("");
  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories")
      const data: Category[] = await response.json();
      setCategories(data)
    } catch (error) {
      console.error("Tarifler gelirken bir hata oluştu: ", error);

    }
  }
  const handleAddData = () => {
    if (materialInput.trim() !== '') {
      setSelectedMaterials([...selectedMaterials, materialInput]);
      setMaterialInput('');
    }
  };
  const handleDeleteMaterial = (materil: string) => {
    setSelectedMaterials(selectedMaterials.filter((material: string) => material !== materil))
  }
  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className="RecipeSideBar">
      <button onClick={() => setSideBarVisibility(!sidebarVisibility)}><FaBars /></button>
      {sidebarVisibility && (
        <div className='recipe-sidebar-container'>
          <div className='sidebar-content'>
            <button onClick={() => setSideBarVisibility(!sidebarVisibility)} className='sidebar-cancel-btn'><MdCancel /></button>
            <div className='search-container'>
              <input type="text" onChange={(e) => setSearchTerm(e.target.value)} className='sidebar-input mt-[60px]' />
              <p className='search-text'>Arama</p>
            </div>
            <select name="" id="" onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
              {selectedCategory !== "All Recipes" && (
                <option value={"All Recipes"} className='filter-recipe-btn' >Tüm Tarifler</option>
              )}
            </select>
            <div className='flex items-center relative'>
              <input type="text" placeholder='içindekiler' onChange={(e) => setMaterialInput(e.target.value)}  className='sidebar-input' />
              <button onClick={handleAddData} className='w-[80px] h-8 bg-[#ee5e40] text-white rounded absolute bottom-2 right-7 flex items-center justify-center'>Ekle</button>
            </div>
            <div className='flex flex-wrap'>
              {selectedMaterials.map((material: string, index: number) => (
                <div className='flex justify-between items-center m-2 border-gray-300 border py-1 px-1 rounded-md text-xs h-8' key={index}>
                  <p>{material}</p>
                  <button onClick={() => handleDeleteMaterial(material)} className=' text-[#ee5e40]'><FaTrash /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeSideBar
