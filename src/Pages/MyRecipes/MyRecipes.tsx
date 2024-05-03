import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Category, RecipeType} from '../../Types/Types';
import { FaTrash } from 'react-icons/fa';
import { PiNotePencilBold } from "react-icons/pi";

const MyRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [userId, setUserId] = useState<number>();
    const [recipeId, setRecipeId] = useState<number>();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [newRecipeModal, setNewRecipeModal] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<number>();
    const [recipeName, setRecipeName] = useState<string>();
    const [recipePreparation_Time, setRecipePreparation_Time] = useState<number>();
    const [recipeMaterials, setRecipeMaterials] = useState<string[]>([]);
    const [recipeImg, setRecipeImg] = useState<string>();
    const [recipeExplanation, setRecipeExplanation] = useState<string>();
    const [materialInput, setMaterialInput] = useState<string>("");
    const [upRecipeId,SetUpRecipeId] = useState<number>();
    const [upRecipeModal,SetUpRecipeModal] = useState<boolean>(false);
    const [upRecipeName,SetUpRecipeName] = useState<string>();
    const [upRecipeExplanation,SetUpRecipeExplanation] = useState<string>();
    const [upRecipeMaterials, setUpRecipeMaterials] = useState<string[]>([]);
    const [upMaterialInput, setUpMaterialInput] = useState<string>("");
    const [upRecipeCategory, setUpRecipeCategory] = useState<number>();
    const [upRecipePreparation_Time, setUpRecipePreparation_Time] = useState<number>();
    console.log(upMaterialInput,upRecipeMaterials);
    
    const filteredRecipes = recipes.filter((recipe) => recipe.user_id.id === userId)
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
    const deleteRecipe = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })        
        } catch (error) {
            console.error("tarif silinirken hata oluştu: ", error);

        }finally{
            setDeleteModal(false)
            getRecipes();
        }
    }
    const addRecipe = async () =>{
        try {
            const formData ={
                name:recipeName,
                preparation_time:recipePreparation_Time,
                base64image:recipeImg,
                explanation:recipeExplanation,
                materials:recipeMaterials,
                categoryId:categoryId,
                user_id:userId
            }
            const response = await fetch("http://localhost:8080/api/recipes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.error("tarif eklenirken hata oluştu: ", error);

        }finally{
            setNewRecipeModal(false);
            getRecipes();
            setRecipeMaterials([])
        }
    }
    const updateRecipe = async () =>{
        try {
            const formData ={
                id: upRecipeId,
                name:upRecipeName,
                preparation_time:upRecipePreparation_Time,
                base64image:recipeImg,
                explanation:upRecipeExplanation,
                materials:upRecipeMaterials,
                categoryId:upRecipeCategory,
                user_id:userId
            }
            const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.error("tarif eklenirken hata oluştu: ", error);

        }finally{
            SetUpRecipeModal(false);
            getRecipes();
            setRecipeMaterials([])
        }
    }
    const handleDeleteModal = (id: number) => {
        setRecipeId(id);
        setDeleteModal(true);
    }
    const handleAddData = () => {
        if (materialInput.trim() !== '') {
            setRecipeMaterials([...recipeMaterials, materialInput]);
            setMaterialInput('');
        }
    };
    const handleAddUpData = () => {
        if (upMaterialInput.trim() !== '') {
            setUpRecipeMaterials([...upRecipeMaterials, upMaterialInput]);
            setUpMaterialInput('');
        }
    };
    const handleDeleteMaterial = (materil: string) => {
        setRecipeMaterials(recipeMaterials.filter((material) => material !== materil))
    }
    const handleDeleteUpMaterial = (materil: string) => {
        setRecipeMaterials(upRecipeMaterials.filter((material) => material !== materil))
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result as string;
                setRecipeImg(image);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpModalVisibility = (id:number, name:string, explanation:string,material:string[],time:number,categoryId:number,img:string) =>{
        SetUpRecipeId(id);
        SetUpRecipeName(name);
        SetUpRecipeExplanation(explanation);
        setUpRecipeMaterials(material);
        setUpRecipePreparation_Time(time);
        setUpRecipeCategory(categoryId);
        setRecipeImg(img);
        SetUpRecipeModal(true);
    }
    useEffect(() => {
        const storedData = localStorage.getItem('userId');
        if (storedData && typeof storedData === 'string') {
            const parsedUserId = parseInt(storedData, 10);
            if (!isNaN(parsedUserId)) {
                setUserId(parsedUserId);
            }
        }
        getRecipes();
        getCategories();
    }, [userId]);
    return (
        <div>
            <Navbar />
            <div className='mt-20'>
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
                <h3 className='text-center py-10 font-bold text-2xl text-[#ee5e40]'>Tarifler</h3>
                {newRecipeModal && (
                    <div className='fixed w-screen h-screen bg-black bg-opacity-40 top-0 left-0 flex items-center justify-center z-50'>
                        <div className='relative w-96 h-[700px] bg-white flex flex-col items-center rounded-xl'>
                            <p className='my-2 font-semibold text-lg text-center p-2 text-[#ee5e40]'>Yeni Tarif</p>
                            <input type="text" placeholder='tarif isim' onChange={(e) => setRecipeName(e.target.value)} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-10' />
                            <input type="number" placeholder='hazırlanma süresi(dk)' onChange={(e) => setRecipePreparation_Time(parseFloat(e.target.value))} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-10' />
                            <input type="file" onChange={(e) => handleFileChange(e)} className='file-input file-input-ghost border py-1 px-2 rounded border-black my-2 w-[300px] h-10' />
                            <textarea name="" id="" placeholder='hazırlanışı' className='border py-1 px-2 rounded border-black my-2 w-[300px] h-32' onChange={(e) =>setRecipeExplanation(e.target.value)} />
                            <select name="" id="" onChange={(e) => setCategoryId(parseFloat(e.target.value))} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-10'>
                                {categories.map((category) => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div className='w-[300px]'>
                                <input type="text" placeholder='içindekiler' onChange={(e) => setMaterialInput(e.target.value)} className='border py-1 px-2 rounded border-black my-2 w-[210px] h-10 mr-[10px]' />
                                <button onClick={handleAddData} className='w-[80px] h-10 bg-[#ee5e40] text-white rounded'>Ekle</button>
                            </div>
                            <div className='flex flex-wrap'>
                                {recipeMaterials.map((material, index) => (
                                    <div className='flex justify-center items-center m-2 border-gray-300 border py-1 px-2 rounded-md text-xs h-6' key={index}>
                                        <p>{material}</p>
                                        <button onClick={() => handleDeleteMaterial(material)} className='ml-2 text-[#ee5e40]'><FaTrash/></button>
                                    </div>
                                ))}
                            </div>
                            <button className='w-[300px] py-1 px-2 mx-2 rounded-md text-white bg-[#ee5e40] absolute bottom-3' onClick={addRecipe}>Ekle</button>
                        </div>
                    </div>
                )}
                {upRecipeModal && (
                    <div className='fixed w-screen h-screen bg-black bg-opacity-40 top-0 left-0 flex items-center justify-center z-50'>
                        <div className='relative w-96 h-[700px] bg-white flex flex-col items-center rounded-xl'>
                            <p className='my-2 font-semibold text-lg text-center p-2 text-[#ee5e40]'>Yeni Tarif</p>
                            <input type="text" value={upRecipeName} onChange={(e) => SetUpRecipeName(e.target.value)} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-10' />
                            <input type="number" value={upRecipePreparation_Time} onChange={(e) => setUpRecipePreparation_Time(parseFloat(e.target.value))} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-10' />
                            <input type="file" onChange={(e) => handleFileChange(e)} className='file-input file-input-ghost border py-1 px-2 rounded border-black my-2 w-[300px] h-10' />
                            <textarea name="" id="" value={upRecipeExplanation} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-32' onChange={(e) =>SetUpRecipeExplanation(e.target.value)} />
                            <select name="" id="" onChange={(e) => setUpRecipeCategory(parseFloat(e.target.value))} className='border py-1 px-2 rounded border-black my-2 w-[300px] h-10'>
                                {categories.map((category) => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div className='w-[300px]'>
                                <input type="text" placeholder='içindekiler' onChange={(e) => setUpMaterialInput(e.target.value)} className='border py-1 px-2 rounded border-black my-2 w-[210px] h-10 mr-[10px]' />
                                <button onClick={handleAddUpData} className='w-[80px] h-10 bg-[#ee5e40] text-white rounded'>Ekle</button>
                            </div>
                            <div className='flex flex-wrap'>
                                {upRecipeMaterials.map((material, index) => (
                                    <div className='flex justify-center items-center m-2 border-gray-300 border py-1 px-2 rounded-md text-xs h-6' key={index}>
                                        <p>{material}</p>
                                        <button onClick={() => handleDeleteUpMaterial(material)} className='ml-2 text-[#ee5e40]'><FaTrash/></button>
                                    </div>
                                ))}
                            </div>
                            <button className='w-[150px] py-1 px-2 mx-2 rounded-md text-[#ee5e40] border-[#ee5e40] border absolute bottom-3 left-4' onClick={updateRecipe}>Kaydet</button>
                            <button className='w-[150px] py-1 px-2 mx-2 rounded-md  text-white bg-[#ee5e40]  absolute bottom-3 right-4' onClick={() =>SetUpRecipeModal(false)}>Vazgeç</button>
                        </div>
                    </div>
                )}
                <button onClick={() => setNewRecipeModal(true)} className='absolute right-2 bg-[#ee5e40] text-white py-1 px-2 rounded'>Tarif Ekle</button>
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
                        {filteredRecipes.map((recipe) => (
                            <tr key={recipe.id}>
                                <td>{recipe.name}</td>
                                <td><img src={recipe.base64image} alt={recipe.name} className='w-32' /></td>
                                <td>{recipe.explanation}</td>
                                <td> {recipe.materials.map((material) => (
                                    <p>- {material}</p>
                                ))}</td>
                                <td>{recipe.preparation_time}</td>
                                <td>{recipe.category.name}</td>
                                <td className='text-[#ee5e40] text-lg'><button onClick={() => handleDeleteModal(recipe.id)} ><FaTrash /></button> <button onClick={() => handleUpModalVisibility(recipe.id,recipe.name,recipe.explanation,recipe.materials,recipe.preparation_time,recipe.category.id,recipe.base64image)}><PiNotePencilBold /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyRecipes
