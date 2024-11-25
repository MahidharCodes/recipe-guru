import React from 'react'
import '../css/RecipeCard.css'
import { useNavigate } from 'react-router-dom'


export default function RecipeCard({ recipe }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/recipes/${recipe.spoonacular_recipe_id}`)
    }

    return (
        <div
            onClick={handleClick}
            className="recipe-card" key={recipe.id}>
            <img src={recipe.image_url} alt="Recipe Image" />
            <h3>{recipe.title}</h3>
        </div>
    )
}
