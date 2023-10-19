import { Outlet } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <SearchBar />
      <Outlet />
    </div>
  );
}
