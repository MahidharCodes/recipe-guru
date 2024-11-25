import React, { useEffect, useState, useContext } from 'react'
import '../css/RecipeSuggestionsPage.css'
import RecipeCard from '../components/RecipeCard'
import { getSavedRecipes } from '../api/api'

export default function RecipesSavedPage() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        document.title = 'Saved Recipes | Meal Prep'
        getSavedRecipes().then((data) => {
            setRecipes(data)
        })
    }, [])

    return (
        <div className="container">
            <h2>Your Saved Recipes</h2>
            <div className="recipe-grid">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>
        </div>
    )
}
