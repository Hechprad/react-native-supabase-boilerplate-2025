import { createContext, ReactNode, useContext, useState } from 'react';

import type { CurrentUser } from './types';

interface AuthContextProps {
  user: CurrentUser | null;
  setAuth: (authUser: CurrentUser | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setAuth: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextProps['user']>(null);

  function setAuth(authUser: CurrentUser | null) {
    setUser(authUser);
  }

  return (
    <AuthContext.Provider value={{ user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default { AuthProvider, useAuth };
