import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main/MainLayout";
import Home from "./pages/home/Home";
import Book from "./pages/book/Book";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Book />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
