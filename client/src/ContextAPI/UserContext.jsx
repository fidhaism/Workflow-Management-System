// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || '';
  });
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('userAvatar') || ''; // Assuming avatar URL is stored in localStorage
  });

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [userName]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem('userAvatar', userAvatar);
      console.log('User avatar updated in localStorage:', userAvatar);
    } else {
      localStorage.removeItem('userAvatar');
      console.log('User avatar removed from localStorage');
    }
  }, [userAvatar]);
  

  return (
    <UserContext.Provider value={{ userName, setUserName, userId, setUserId, userAvatar, setUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
