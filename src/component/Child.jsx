import React,{memo  } from 'react'

function Child(fun,counttwo,setCounttwo) {
  console.log("The useCall is running");
    return (
    <div>
      <h1>Hello I am abhisek bhatta</h1>
    </div>
  )
}

export default memo(Child);
