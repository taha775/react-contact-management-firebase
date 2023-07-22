import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { db} from '../firebase';
import { getDatabase, ref, onValue,remove } from 'firebase/database';
import { toast } from 'react-toastify';



const Home = () => {
  const [data,setData] = useState({ })




  

// ...

useEffect(() => {
  const contactsRef = ref(db, 'contacts');

  const onDataChange = (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      setData(data);       //setting firebase data  in state
    }
  };

  const databaseListener = onValue(contactsRef, onDataChange);

  return () => {
    // Clean up the listener when the component unmounts
    databaseListener();
  };
}, []);

  
  // useEffect(()=>{

  //   db.child("contacts").on("value",(snapshot) =>{
  //     if(snapshot.val() !== null){
  //       setData({})
  //     }
  //   })


  //   return()=>{
  //     setData({})
  //   }
  //   // const contactsRef = ref(db, 'contacts')
  //   // get(contactsRef).then((snapshot.val()))

  
  // },[])

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const contactRef = ref(db, `contacts/${id}`);
  
      remove(contactRef, (err) => {
        if (err) {
          toast.error(err.message);
        } else {
          toast.success('Contact deleted successfully');
        }
      });
    }
  };
  


  return (
   <div style={{margin:"100px"}}>
    <table className='styled-table'>
    <thead>
      <tr>
        <th style={{textAlign:"center"}}>No</th>
        <th style={{textAlign:"center"}}>Name</th>
        <th style={{textAlign:"center"}}>Email</th>
        <th style={{textAlign:"center"}}>Contact</th>
        <th style={{textAlign:"center"}}>Action</th>
      </tr>
    </thead>
    <tbody>
    {Object.keys(data).map((id,index)=>{
      // console.log(id)
      // console.log(index)
      return(
      
        <tr key={id}>
          <th scope='row' >{index + 1}</th>
          <td>{data[id].name}</td>
          <td>{data[id].email}</td>
          <td>{data[id].contact}</td>
          <td><img src={data[id].productimage} alt="" /></td>
          <td>
            <Link to={`/update/${id}`}>
            <button className='btn btn-edit'>edit</button>
            </Link>
            <button className='btn btn-delete' onClick={()=>onDelete(id)}>delete</button>
            <Link to={`/view/${id}`}>
            <button className='btn btn-view'>view</button>
            </Link>
          </td>
        </tr>
      
      
      )
      
    })

      
    }

    </tbody>



    </table>
   


   </div>
  )
}

export default Home