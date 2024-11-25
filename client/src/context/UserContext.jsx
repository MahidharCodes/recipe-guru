import { createContext, useState, useEffect } from 'react';
import { fetchUserData } from '../api/api';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();

    if (token) {
      fetchUserData()
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
