import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error); // Reject the error to handle it in the component
  }
);

const handleError = (error) => {
  if (error.response) {
    console.error('Error:', error.response.data.message);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('No response received:', error.request);
    throw new Error('No response from the server. Please try again later.');
  } else {
    console.error('Request setup error:', error.message);
    throw new Error('An error occurred. Please try again.');
  }
};

// API for user authentication
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const signupUser = async (username, email, password) => {
  try {
    const response = await apiClient.post('/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchUserData = async () => {
    try {
        const response = await apiClient.get('/users/profile');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const fetchDiets = async () => {
    try {
        const response = await apiClient.get('/diets');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateUserProfile = async (username, email, diet_preferences) => {
    try {
        const response = await apiClient.put('/users/profile', { "user_name": username, email });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateUserDietPreferences = async (diet_preferences) => {
    try {
        const response = await apiClient.put('/users/diets', { "diets" : diet_preferences });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}


export const logoutUser = () => {
  localStorage.removeItem('token');
};


export const fetchSuggestedRecipes = async (ingredients, preferences) => {
  try {
    const response = await apiClient.post('/recipes/suggestions', { ingredients, preferences });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchRecipeById = async (recipeId) => {
  try {
    const response = await apiClient.get(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const saveRecipeToFavorites = async (recipeId) => {
  try {
    const response = await apiClient.post('/recipes/save', { "recipeId": recipeId });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSavedRecipes = async () => {
  try {
    const response = await apiClient.get('/recipes/saved');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteFavoriteRecipe = async (recipeId) => {
  try {
    const response = await apiClient.delete(`/recipes/deleteSaved/${recipeId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
