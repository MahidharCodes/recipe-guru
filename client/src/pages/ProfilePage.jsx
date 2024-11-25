import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { fetchDiets, updateUserProfile, updateUserDietPreferences } from '../api/api';
import '../css/Profilepage.css';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
    
    const { user, setUser } = useContext(UserContext);
    
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [diet, setDiet] = useState(user.diet_preferences);

    const [diets, setDiets] = useState([]);

    useEffect(() => {
        document.title = 'Profile | Meal Prep';
        setUsername(user.username);
        setEmail(user.email);
        setDiet(user.diet_preferences);
    }, [user]);

    useEffect(() => {
        toast.promise(
        fetchDiets().then((data) => {
            setDiets(data);
        })
        , {
            pending: 'Fetching diet preferences...',
            success: 'Diet preferences fetched successfully!',
            error: 'Failed to fetch diet preferences'
        });
    }, []);

    const handleDietChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => parseInt(option.value));
        setDiet(selectedOptions);
    }

    const handleSave = () => {
        toast.promise(
        updateUserProfile(username, email).then(() => {
            updateUserDietPreferences(diet).then(() => {
                setUser({ ...user, username, email, diet_preferences: diet });
            });
        }),{
            pending: '🤖 Updating profile...',
            success: '🎉 Profile updated successfully!',
            error: '❌ Failed to update profile'
        })
    };

    return (
        <div className="profile-container">
            <h2>Profile Information</h2>
            <span>Name</span>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <span>Email</span>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <span>Diet Preferences</span>
            <select multiple size={11} value={diet} onChange={handleDietChange}>
                {diets.map((diet) => (
                    <option key={diet.id} value={diet.id} data-tooltip={diet.description} data-placement={(diet.id == 1)? "bottom": ""}>
                        {diet.diet_name}
                    </option>
                ))}
            </select>
            <button className="save-button" onClick={handleSave}>
                Save Changes
            </button>
            <ToastContainer icon={false} theme="light"/>
        </div>
    );
}
