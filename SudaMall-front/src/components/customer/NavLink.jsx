import React from 'react'
function NavLink({Icon, iconSize, title,id, path, active, setActive, navigate}) {

  

  
  return (
    <li className={`flex flex-col items-center justify-center cursor-pointer p-4 transition-all duration-300 ease-in-out ${
          active === id ? "text-primary" : ""
        }`}
        onClick={() => handleClick({id, path})}
    >
        <Icon className={`size-${iconSize}`} />
        <p>{title}</p>
    </li>
  )
}

export default NavLink