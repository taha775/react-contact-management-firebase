import React, { useEffect, useState } from 'react';
import { ref, push, get, onValue, set } from 'firebase/database';
import { toast } from 'react-toastify';
import './AddEdit.css';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const contactsRef = ref(db, 'contacts');

    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setData(data);
      }
    };

    const databaseListener = onValue(contactsRef, onDataChange);

    return () => {
      // Clean up the listener when the component unmounts
      databaseListener();
    };
  }, []);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
        
    }
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error('Please provide a value for each input field.');
    } else {
      if (!id) {
        const contactsRef = ref(db, 'contacts');

        push(contactsRef, state, (error) => {
          if (error) {
            toast.error(error.message);
          } else {
            toast.success('Data added successfully!');
          }
        });
      } else {
        const contactRef = ref(db, `contacts/${id}`);

        set(contactRef, state, (error) => {
          if (error) {
            toast.error(error.message);
          } else {
            toast.success('Data updated successfully!');
          }
        });
      }
    }

    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <div style={{ marginTop: '100px' }}>
        <form
          style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" style={{ alignItems: 'center' }}>
            Name
          </label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="name">Contact</label>
          <input
            type="number"
            className="input"
            name="contact"
            id="contact"
            value={contact}
            onChange={handleInputChange}
            placeholder="Enter your contact"
          />
          <br />
          <input className="submit" type="submit" value={id ? 'Update' : 'Save'} />
        </form>
      </div>
    </>
  );
};

export default AddEdit;
