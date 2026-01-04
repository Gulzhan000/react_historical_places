import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./layout/Layout";

import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import ToursList from "./pages/TourList";
import CreateTour from "./pages/CreateTour";
import EditTour from "./pages/EditTour";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";
import Favorites from "./pages/Favorites";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

export default function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="tours" element={<ToursList />} />
        <Route path="create-tour" element={<CreateTour />} />
        <Route path="edit-tour/:id" element={<EditTour />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="signin" element={<SignIn setIsAuth={setIsAuth} />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="profile"
          element={
            isAuth ? <Profile /> : <Navigate to="/signin" />
          }
        />
      </Route>
    </Routes>
  );
}