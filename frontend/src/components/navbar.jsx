import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div>
        <div className="navbar bg-primary text-primary-content">
          <Link to="/" className="btn btn-ghost normal-case text-xl mr-auto">
            Make a Commit
          </Link>

          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/profile">profile</Link>
              </li>
              {/* drop down menu */}
              {/* <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
              <li>
                <a className="btn btn-primary mr-3 text-white">logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
