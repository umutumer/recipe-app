import React, { useEffect, useState } from 'react'
import './SomeRecipes.scss'
import { FaRegClock } from "react-icons/fa";
import { Category, RecipeType } from '../../Types/Types';
import { Link } from 'react-router-dom';
const SomeRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const getRecipes = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/recipes")
            const data: RecipeType[] = await response.json();
            setRecipes(data)
        } catch (error) {
            console.error("Tarifler gelirken bir hata oluştu: ", error);

        }
    }
    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/categories")
            const data: Category[] = await response.json();
            setCategories(data)
        } catch (error) {
            console.error("Tarifler gelirken bir hata oluştu: ", error);

        }
    }
    useEffect(() => {
        getRecipes();
        getCategories();
    }, [])
    return (
        <div className='some-recipes'>
            <div className='filter-recipe-container'>
                {categories.map((category) => (
                    <button className='filter-recipe-btn' key={category.id}>{category.name}</button>
                ))}
            </div>
            <div className='recipes'>
                {recipes.map((recipe, index) => (index < 9 &&
                    <div className='recipe' key={recipe.id}>
                        <Link to={`/yemek-tarifleri/${recipe.id}`}>
                            <img src={recipe.base64image} alt={recipe.name} className='recipe-img' />
                        </Link>
                        <div>
                            <div className='recipe-content'>
                                <p className='recipe-title'>{recipe.name}</p>
                                <p className='recipe-text'>{recipe.preparation_time}dk<FaRegClock style={{ marginLeft: "5px" }} /> </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SomeRecipes
