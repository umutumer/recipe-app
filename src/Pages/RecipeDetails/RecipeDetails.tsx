import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RecipeType } from "../../Types/Types";
import { FaRegClock } from "react-icons/fa";
import './RecipeDetails.scss'
import Navbar from "../../components/Navbar/Navbar";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState<RecipeType>();
    console.log(recipe?.category.name);


    const { id } = useParams();
    const getRecipesById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/recipes/${id}`)
            if (response.ok) {
                const data: RecipeType = await response.json();
                setRecipe(data)
            }
        } catch (error) {
            console.error("Yemek Tarifi gelirken bir hata oluştu:", error);

        }
    }
    useEffect(() => {
        getRecipesById();
    }, [])
    return (
        <div className="recipe-details">
            <Navbar />
            {recipe && (
                <div key={recipe.id} className='recipe-details-container'>
                    <img src={recipe.base64image} alt={recipe.name} className='recipe-details-img' />
                    <div className='recipe-details-content'>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ fontSize: "x-large",fontWeight: "600"}}>{recipe.name}</p>
                            <p className="flex items-center">{recipe.preparation_time}dk<FaRegClock  className="ml-1"/></p>
                        </div>
                        <p style={{ color: "gray" }}>{recipe.user_id.username} tarafından oluşturuldu.</p>
                        <p>Kategori: <span>{recipe.category.name}</span></p> 
                        <div>
                            <p className='recipe-details-title'>Açıklama</p>
                            <p>{recipe.explanation}</p>
                        </div>
                        <hr className="recipe-details-line" />
                        <div className="mb-10">
                            <p className='recipe-details-title'>İçindekiler</p>
                            {recipe.materials.map((material) => (
                                <p>- {material}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default RecipeDetails
