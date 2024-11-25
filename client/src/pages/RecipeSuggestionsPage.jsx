import React, { useEffect, useState, useContext } from 'react'
import '../css/RecipeSuggestionsPage.css'
import RecipeCard from '../components/RecipeCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchSuggestedRecipes, fetchDiets } from '../api/api'
import { UserContext } from '../context/UserContext'

export default function RecipeSuggestionsPage() {

    const [recipes, setRecipes] = useState([])
    const [searchString, setSearchString] = useState('')
    const [diets, setDiets] = useState([])
    const [preferences, setPreferences] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        document.title = 'Recipe Suggestions | Meal Prep';
        const fetchDietData = async () => {
            try {
                const data = await fetchDiets();
                setDiets(data);
                const userPreferences = data
                    .filter(diet => user.diet_preferences.includes(diet.id))
                    .map(diet => diet.diet_name);
                setPreferences(userPreferences);
            } catch (error) {
                console.error('Error fetching diets:', error);
            }
        };

        fetchDietData();
    }, []);

    const fetchRecipes = async () => {
        try {
            const ingredients = searchString.split(',').map(ingredient => ingredient.trim());
            toast.promise(fetchSuggestedRecipes(ingredients, preferences).then((data) => {
                const dataTrans = data.map(recipe => {
                    return {
                        spoonacular_recipe_id: recipe.id,
                        title: recipe.title,
                        image_url: recipe.image,
                        readyInMinutes: recipe.readyInMinutes,
                        servings: recipe.servings
                    }
                })
                setRecipes(dataTrans)
            }), {
                pending: '🍳 Fetching recipes...',
                success: '🍽️ Recipes fetched successfully!',
                error: '❌ Failed to fetch recipes'
            })
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchRecipes();
    }, [preferences]);

    return (
        <div className="container">
            <div className="search-bar">
                <input
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    type="text" placeholder="Enter ingredients..." />
                <button
                    onClick={fetchRecipes}
                    className="search-button">Search</button>
            </div>

            <div className="recipe-grid">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>
            <ToastContainer icon={false} theme="light" />
        </div>
    )
}
