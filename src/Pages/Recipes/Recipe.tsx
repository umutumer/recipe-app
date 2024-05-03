import React, { useEffect, useState } from 'react'
import RecipeSideBar from '../../components/RecipeSideBar/RecipeSideBar'
import Navbar from '../../components/Navbar/Navbar'
import { RecipeType } from '../../Types/Types';
import RecipeList from '../../components/RecipeList/RecipeList';

const Recipe = () => {
  const [searchTerm,setSearchTerm] = useState<string>("");
  const [selectedCategory,setSelectedCategory] = useState<string>("All Recipes");
  const [selectedMaterials,setSelectedMaterials] = useState<string[]>([]);
  const[recipes,setRecipes] = useState<RecipeType[]>();
  const [filteredRecipes,setFilteredRecipes] = useState<RecipeType[]>();
  const getRecipes = async () =>{
    try{
      const response = await fetch("http://localhost:8080/api/recipes")
      const data : RecipeType[] = await response.json();
      setRecipes(data)
    }catch(error){
      console.error("Tarifler gelirken bir hata oluştu: ",error);
      
    }
  }
  useEffect(() =>{
    getRecipes();
  },[])
  useEffect(() => {
    const filterRecipes = () => {
      if (!recipes) return;
      
      let filtered: RecipeType[] = recipes;
      
      if (searchTerm) {
        filtered = filtered.filter(recipe =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory !== "All Recipes") {
        filtered = filtered.filter(recipe =>
          recipe.category.name === selectedCategory
        );
      }
      
      const selectedMaterialKeys = Object.keys(selectedMaterials);
      if (selectedMaterialKeys.length > 0) {
        filtered = filtered.filter(recipe =>
          selectedMaterialKeys.every(material =>
            recipe.materials.includes(material)
          )
        );
      }
      
      setFilteredRecipes(filtered);
    };

    filterRecipes();
  }, [searchTerm, selectedCategory, selectedMaterials, recipes]);

  return (
    <div>
      <Navbar />
      <div>
        <RecipeSideBar setSelectedCategory={setSelectedCategory} setSelectedMaterials={setSelectedMaterials} setSearchTerm={setSearchTerm} selectedMaterials={selectedMaterials} selectedCategory={selectedCategory}/>
        <RecipeList filteredRecipes={filteredRecipes} />
      </div>
    </div>
  )
}

export default Recipe
