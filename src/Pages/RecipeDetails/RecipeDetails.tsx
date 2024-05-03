import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Comments, RecipeType, UserType } from "../../Types/Types";
import { FaRegClock, FaStar } from "react-icons/fa";
import './RecipeDetails.scss'
import Navbar from "../../components/Navbar/Navbar";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState<RecipeType>();
    console.log(recipe?.category.name);
    const [comment, setComment] = useState<string>();



    const userIdToken = localStorage.getItem('userId')
    const userId = userIdToken && parseFloat(userIdToken)
    console.log(userId);
    const currentDate: Date = new Date();
    const isoDateString: string = currentDate.toISOString();
    console.log(isoDateString);
    const [comments, setComments] = useState<Comments[]>([]);

    const filteredComments = comments && comments.filter((comment: Comments) => comment.recipeeId === recipe?.id)
    console.log(filteredComments, "filtered");

    const getComments = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/comment")
            const data: Comments[] = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Yorumlar gelirken bir hata oluştu: ", error);

        }
    }
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
    const [loggedInUser, setLoggedInUser] = useState<UserType | undefined>();
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
    const recipeId = id ? Number(id) : null;

    console.log(recipeId);

    const addComment = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        const commentData = {
            userId: userId,
            recipeId: recipeId,
            comment: comment,
            base64image: recipeImg,
            time: isoDateString
        };
        try {
            const response = await fetch("http://localhost:8080/api/comment", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(commentData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
            }
        } catch (error) {
            console.error("Yorum atılırken bir hata oluştu: ", error);
        } finally {
            getComments();
        }
    }
    const [recipeImg, setRecipeImg] = useState<string>();


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
    useEffect(() => {
        getRecipesById();
        getUserById();
        getComments();
    }, [])
    return (
        <div className="recipe-details">
            <Navbar />
            {recipe && (
                <div key={recipe.id} className='recipe-details-container'>
                    <div className="flex">
                        <img src={recipe.base64image} alt={recipe.name} className='recipe-details-img' />
                        <div className='recipe-details-content'>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: "x-large", fontWeight: "600" }}>{recipe.name}</p>
                                <p className="flex items-center">{recipe.preparation_time}dk<FaRegClock className="ml-1" /></p>
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
                    <form className="w-full" onSubmit={addComment}>
                        <h3 className="text-center font-semibold text-3xl my-5">Yorumlar ({filteredComments.length})</h3>
                        <div className="flex flex-col items-center my-5 w-full">
                            <h4 className="text-center font-semibold text-2xl my-2">Yorum Yap</h4>
                            <textarea className="w-full h-20 my-2 p-2 border border-black rounded" placeholder="Recipe hakkındaki düşünceleriniz..." onChange={(e) => setComment(e.target.value)} />
                            <input type="file" onChange={(e) => handleFileChange(e)} className='file-input file-input-ghost border py-1 px-2 rounded border-black my-2 w-full h-10' />
                            <input type="submit" id="comment-btn" className="w-full bg-[#ee5e40] px-2 py-1 rounded text-white" value={"Yorum Yap"} />

                        </div>
                    </form>
                    {filteredComments.map((comment: Comments) => (
                        <div className="flex items-center w-full border-gray-100 border rounded my-5" key={comment.id}>
                                <img src={comment.base64image} alt="" className="w-56 rounded" />
                                <div className="ml-2">
                                <p className="text-xl"> <span className="text-[#ee5e40] font-semibold">Yorum Sahibi: </span> {comment.userName}</p>
                                <p className="text-xl"> <span className="text-[#ee5e40] font-semibold">Yorum: </span> {comment.comment}</p>
                                </div>
                        </div>
                    ))}
                </div>
            )
            }

        </div >
    )
}

export default RecipeDetails
