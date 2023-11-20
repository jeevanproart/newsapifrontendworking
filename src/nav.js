import React from "react";
import { Link } from "react-router-dom";
import briefLogo from "./brief.png"; 


function Nav() {
  return (
    <>
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={briefLogo} alt="Brief Logo" className="w-60 h-40 text-white p-2 bg-white-500 rounded-full" />
          <span className="ml-3 text-2xl">News</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="/forYou">For You</Link>
          <Link className="mr-5 hover:text-gray-900" to="/login">Login</Link>
          <Link className="mr-5 hover:text-gray-900" to="/register">Register</Link>
          <Link className="mr-5 hover:text-gray-900" to="/Apple">Apple</Link>
          <Link className="mr-5 hover:text-gray-900" to="/Tesla">Tesla</Link>
          <Link className="mr-5 hover:text-gray-900" to="/Bitcoin">Bitcoin</Link>
          <Link className="mr-5 hover:text-gray-900" to="/Nasa">Nasa</Link>
          <Link className="mr-5 hover:text-gray-900" to="/upsc">upsc</Link>
          <Link className="mr-5 hover:text-gray-900" to="/userInfo">Profile</Link>
        </nav>
      </div>
    </header>

    </>
  );
}

export default Nav;
