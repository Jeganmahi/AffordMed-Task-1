// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   console.log(storedUser)
  //   if (storedUser) {
  //     setUser(JSON.parse(localStorage.getItem('user')));
  //   }
  // }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout =  async () => {
    console.log(user.username)

   const email = user.username
    const respone  = await fetch(`http://localhost:5001/updateLogout/${email}`);
    localStorage.removeItem('user');
    
    setUser(null);
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
