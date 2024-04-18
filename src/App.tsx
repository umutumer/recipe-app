
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Recipe from './Pages/Recipes/Recipe';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import PersonalInformation from './Pages/PersonalInformation/PersonalInformation';
import Admin from './Pages/Admin/Admin';
import AdminUsers from './Pages/AdminUsers/AdminUsers';
import MyRecipes from './Pages/MyRecipes/MyRecipes';

function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/yemek-tarifleri' element={<Recipe />}  />
      <Route path='/tariflerim' element={<MyRecipes />}  />
      <Route path='/yemek-tarifleri/:id' element={<RecipeDetails />}  />
      <Route path='/giris-yap' element={<Login />}  />
      <Route path='/kayit-ol' element={<Register />}  />
      <Route path='/hesabim' element={<PersonalInformation />}  />
      <Route path='/admin' element={<Admin />}  />
      <Route path='/admin/kullanicilar' element={<AdminUsers />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
