import { Link, Outlet } from "react-router-dom";
export default function Root() {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Index</Link>
            </li>
            <li>
              <Link to="/breeds">Breeds</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </>
    );
  }