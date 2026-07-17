import {createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', {credentials : 'include'});
        if(res.ok){
          const data = await res.json();
          setUser(data.user);
        }
        else{
          setUser(null);
        }
      }
      catch(error){
        setUser(null);
      }
      finally{
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function logout(){
    await fetch('/api/auth/logout', {
      method : 'POST',
      credentials : 'include'
    })
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user, setUser, loading, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}