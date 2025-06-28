import './App.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './services/authService';
import { Footer, Header } from './components';
function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser() 
    .then((userData)=>{
      if(userData){
        dispatch(login({userData})); // login action from authSlice
      } else {
        dispatch(logout()); // logout action from authSlice
      }
    })
    .finally(()=>{
      setLoading(false);
    })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/*todo = <Outlet /> from react router dom*/}
        </main>
        <Footer />
      </div>
    </div>
  ):null
}

export default App
