import { createContext, useContext} from 'react';

export const AuthContext = createContext();
export const UserInfoContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useUserInfo() {
    return useContext(UserInfoContext);
}