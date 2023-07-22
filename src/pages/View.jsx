import React,{useState,useEffect} from 'react'
import { db } from '../firebase'
import { useParams,Link } from 'react-router-dom'
import './View.css'
import { ref, onValue } from 'firebase/database';

const View = () => {

  const [user,setUser] = useState({})
  const {id} = useParams()

  useEffect(()=>{
    const contactsRef = ref(db, `contacts/${id}`);

    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUser(data);
      }
      else{
        setUser({})
      }
    };
  
    const databaseListener = onValue(contactsRef, onDataChange);
  
    return () => {
      // Clean up the listener when the component unmounts
      databaseListener();
    };

  },[id])

console.log("user",user)






  return (
    <div style={{marginTop:"150px"}}>
      <div className='card'>
        <div className='card-header'>
          <p>user contact details</p>
        </div>
        <br />
        <div className="container">
          <strong>ID</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>NAME</strong>
          <span>{user.name}</span>
          <br />
          <br />
        
          <strong>EMAIL</strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>CONTACT</strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to={"/"} >
            <button className='btn btn-edit' >
                GO BACK 
            </button>
          </Link>
        
           
        </div>

      </div>

    </div>
  )
}

export default View