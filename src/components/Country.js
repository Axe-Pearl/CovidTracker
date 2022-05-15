import { React, useEffect}  from 'react'
import axios from "axios"
function Country() {
  useEffect(()=>{
       const fetchData = async ()=> await axios.get("http://localhost:3000/AFG")
      .then((res)=>console.log(res.data));
      fetchData();
  },[])
  return (
    <div>Country</div>
  )
}

export default Country