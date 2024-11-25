import React, { useEffect, useState } from 'react'
import '../css/RecipeDetailsPage.css'
import { fetchRecipeById, getSavedRecipes, saveRecipeToFavorites, deleteFavoriteRecipe } from '../api/api';
import ShimmerLoader from '../components/ShimmerLoader';
import { toast, ToastContainer } from 'react-toastify';

export default function RecipeDetailsPage() {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        document.title = recipe.title ? recipe.title : 'Recipe Details';
        const fetchRecipe = async () => {
            try {
                const data = await fetchRecipeById(id);
                setRecipe(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const data = await getSavedRecipes();
                const isFav = data.some((savedRecipe) => savedRecipe.spoonacular_recipe_id === parseInt(id));
                setIsFavorite(isFav);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        checkIfFavorite();
    }, [id])

    const handleFavoriteClick = async () => {
        try {
            if (isFavorite) {
                await deleteFavoriteRecipe(recipe.spoonacular_recipe_id);
                setIsFavorite(false);
            } else {
                await saveRecipeToFavorites(recipe.spoonacular_recipe_id);
                setIsFavorite(true);
            }
            toast.success(isFavorite ? 'Removed from Favorites' : 'Saved to Favorites')
        } catch (error) {
            console.error('Error updating favorite status:', error);
            toast.error('Failed to update favorite status')
        }
    }



    if (loading) return <ShimmerLoader />;

    return (
        <div className="recipe container"
            style={{ padding: '20px' }}
        >
            <img src={recipe.image_url} alt="Recipe Image" className="recipe-image" />

            <h1>{recipe.title}</h1>

            <div className="meta-info">
                <span>Ready in Minutes: {recipe.ready_in_minutes} mins</span>
                <span>Servings: {recipe.servings}</span>
            </div>

            <div className="ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</li>
                    ))}
                </ul>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>
                <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
            </div>

            <button
                onClick={handleFavoriteClick}
                className="save-button">
                {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            </button>
            <ToastContainer icon={false} theme="light"/>
        </div>
    )
}
