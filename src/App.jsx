import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// Существующие страницы
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";

// CRUD для туров / корзины
import BasketList from "./pages/BasketList";
import CreateOrder from "./pages/CreateOrder";
import UpdateOrder from "./pages/UpdateOrder";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Главная страница со списком исторических мест */}
        <Route index element={<PostsList />} />
        <Route path="post/:id" element={<PostDetail />} />

        {/* Страницы CRUD для туров / корзины */}
        <Route path="basket-list" element={<BasketList />} />
        <Route path="create-order" element={<CreateOrder />} />
        <Route path="update-order/:id" element={<UpdateOrder />} />
      </Route>
    </Routes>
  );
}
