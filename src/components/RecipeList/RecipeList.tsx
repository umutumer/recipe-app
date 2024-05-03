import { FaClock } from 'react-icons/fa'
import { RecipeListProps } from '../../Types/Types'
import './RecipeList.scss'
import { Link } from 'react-router-dom'

const RecipeList: React.FC<RecipeListProps> = ({ filteredRecipes }) => {
    return (
        <div className='recipes'>
            {filteredRecipes?.map((recipe) => (
                <div key={recipe.id} className='recipe'>
                    <Link to={`/yemek-tarifleri/${recipe.id}`}>
                        <img src={recipe.base64image} alt={recipe.name} className='recipe-img' />
                    </Link>
                    <div className='recipe-content'>
                        <p className='recipe-title'>{recipe.name}</p>
                        <p className='recipe-text'>{recipe.preparation_time} dk <FaClock className='ml-1' /></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecipeList
