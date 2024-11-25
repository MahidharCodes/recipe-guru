import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage, RecipeSuggestionsPage, RecipeDetailsPage, SignUpPage, NotFoundPage, RecipesSavedPage } from '../pages';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ShimmerLoader from '../components/ShimmerLoader';


function AppRoutes() {
  const user = useContext(UserContext);
  if (user.loading) return <ShimmerLoader />;
  return (
    <Routes>
      <Route path="/" element={user.user ? <HomePage /> : <LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={user.user ? <ProfilePage /> : <LoginPage />} />
      <Route path="/recipe-suggestions" element={user.user ? <RecipeSuggestionsPage /> : <LoginPage />} />
      <Route path='/favorite-recipes' element={user.user ? <RecipesSavedPage /> : <LoginPage />} />
      <Route path="/recipes/:id" element={user.user ? <RecipeDetailsPage /> : <LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
