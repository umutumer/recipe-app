import React, { useEffect, useState } from 'react'
import { RecipeType } from '../../Types/Types';
import { FaTrash } from 'react-icons/fa';

const RecipeTable = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [recipeId, setRecipeId] = useState<number>();
    const [deleteModal,setDeleteModal] = useState<boolean>(false);
    const [newRecipeModal,setNewRecipeModal] = useState<boolean>(false);
    const getRecipes = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/recipes")
            const data: RecipeType[] = await response.json();
            setRecipes(data)
        } catch (error) {
            console.error("Tarifler gelirken bir hata oluştu: ", error);

        }
    }
    const handleDeleteModal = (id: number) => {
        setRecipeId(id);
        setDeleteModal(true)
    }
    const deleteRecipe = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`,{   
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
            })
        }catch(error){
            console.error("tarif silinirken hata oluştu: ",error);
            
        }
    } 
    useEffect(() => {
        getRecipes();
    }, [])
    return (
        <div>
            {deleteModal && (
            <div className='fixed w-screen h-screen bg-black bg-opacity-40 top-0 left-0 flex items-center justify-center z-50'>
                <div className='relative w-96 h-32 bg-white flex flex-col items-center rounded-xl'>
                    <p className='my-2 font-semibold text-lg text-center p-2 text-[#ee5e40]'>Tarifi Silme İşlemini Onaylıyor musunuz ?</p>
                    <div className='absolute bottom-3'>
                        <button className='w-20 py-1 px-2 mx-2 rounded-md text-[#ee5e40] border-[#ee5e40] border' onClick={deleteRecipe}>Evet</button>
                        <button className='w-20 py-1 px-2 mx-2 rounded-md text-white bg-[#ee5e40]' onClick={() => setDeleteModal(false)}>Hayır</button>
                    </div>
                </div>
            </div>
        )}
            <h3 className='text-center my-10 font-bold text-2xl text-[#ee5e40]'>Tarifler</h3>
            <table className="table mt-16">
                <thead>
                    <tr style={{ color: "#ee5e40" }}>
                        <th>Tarif Adı</th>
                        <th>Tarif Resim</th>
                        <th>Tarif Açıklama</th>
                        <th>Tarif Materyalleri</th>
                        <th>Tarif Süresi</th>
                        <th>Kategori Adı</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{recipe.name}</td>
                            <td><img src={recipe.base64image} alt={recipe.name} className='w-32' /></td>
                            <td>{recipe.explanation}</td>
                            <td> {recipe.materials.map((material) => (
                                <p>- {material}</p>
                            ))}</td>
                            <td>{recipe.preparation_time}</td>
                            <td>{recipe.category.name}</td>
                            <td><button onClick={() => handleDeleteModal(recipe.id)} ><FaTrash /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecipeTable
