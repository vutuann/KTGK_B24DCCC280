import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f2f2f2" }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: "10px",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Trang chủ
      </NavLink>
      <NavLink
        to="/create"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Viết bài
      </NavLink>
    </nav>
  );
}
