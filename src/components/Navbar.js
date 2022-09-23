import React from 'react'
import "./Navbar.css"
function Navbar() {
  return (
    <div>
        <div className='navbar'>
            <img className="logo" src='https://www.gunneboentrancesecurity.com/wp-content/uploads/2020/05/corona-icon-dark.png' alt="app-logo"></img>
            <h2 style={{"margin":"10px"}}>COVID TRACKER</h2>
        </div>
    </div>
  )
}

export default Navbar