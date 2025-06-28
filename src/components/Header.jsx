import React from "react";
import { Container, Logo, LogoutBtn } from ".";
import { useSelector } from "react-redux"; // selector hoga tb he to store m jaa ke dekh paaunga ki user logged in hai ya nahi
import { Link } from "react-router-dom";// links for redirections 
import { useNavigate } from "react-router-dom"; // new thing this time

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status) // extracting from state that whether user is authenticated or not
    const navigate = useNavigate(); // this is used to navigate to different routes programmatically

    // for making navgation bar, we will make an array and loop through it
    const navItems = [ // this array is having objects, this is helpful for making the navigation bar dynamic, ek ek values likhoge to kuch naya button aayua to usko alg se lagana padega, but not here, here we will just add one more value in object and our navigation bar is ready
        { 
            name: 'Home', 
            slug: '/' 
        }, // slug is just name we given, you can give anything, it is just for making the code more readable
        {
            name: "Login",
            slug: "/login",
            active: !authStatus, // if user is not authenticated, then only show login button
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
    <header className='py-3 shadow bg-gray-500'>
      <Container> // our navigation bar is also inside the container
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          // we will just loop through the navItems array and make the buttons
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}> // key is used to identify the element, it is a unique identifier, so that react can identify which element is changed, added or removed, although here we are using name as key, but it is not a good practice, you should use id or something unique
              {/* if item is active, then only show the button, otherwise do not show anything */}
                <button
                onClick={() => navigate(item.slug)} // this will navigate to the item's slug, for navigate to work - give then just the url. link can also be used(same working, both same ways), argument which we have to pass inside is - " kaha le ke jaao "
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null // nothing if item is not active, so we will not show the button
            )}
            // using authStatus to check if user is authenticated or not, if user is authenticated, then only show the logout button
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header;
