import React from "react";

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container

// now suppose if you want to change the width in future than you just need to change the width in one place. 