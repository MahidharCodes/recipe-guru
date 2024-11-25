import React, { useState, useContext, useEffect, startTransition } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import '../css/HomePage.css'

import { getSavedRecipes } from '../api/api';

export default function HomePage() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const username = user.username;

    useEffect(() => {
        document.title = 'Home Page';
        try {
            getSavedRecipes()
                .then((data) => {
                    startTransition(() => {
                        setSavedRecipes(data);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className="container">
            <div className="welcome">
                Welcome, <strong>{username}</strong>!! Ready to find your next favorite recipe?
            </div>

            <div className="buttons">
                <button
                    onClick={() => navigate('/recipe-suggestions')}
                    className="button">Get Recipe Suggestions</button>
                <button
                    onClick={() => navigate('/favorite-recipes')}
                    className="button">View Saved Recipes</button>
            </div>

            <div className="recommendations">
                <h2>Quick Recommendations</h2>
                {savedRecipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe.id} />
                ))
                }
            </div>
        </div>
    )
}
