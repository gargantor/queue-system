import React, { useEffect, useState } from 'react';
const createTokenProvider = () => {

    /* Implementation */
    let _token: { accessToken: string, refreshToken: string } = 
        JSON.parse(localStorage.getItem('user') || '') || null;

    let observers: Array<(isLogged: boolean) => void> = [];

    const subscribe = (observer: (isLogged: boolean) => void) => {
        observers.push(observer);
    };
    
    const unsubscribe = (observer: (isLogged: boolean) => void) => {
        observers = observers.filter(_observer => _observer !== observer);
    };
    
    const getExpirationDate = (jwtToken?: string): number | null => {
        if (!jwtToken) {
            return null;
        }
    
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));        
    
        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000 || null;
    };

    const isExpired = (exp?: number) => {
        if (!exp) {
            return false;
        }
    
        return Date.now() > exp;
    };

    const getToken = async () => {
        if (!_token) {
            return null;
        }
    
        if (isExpired(getExpirationDate(_token.accessToken))) {
            /*const updatedToken = await fetch('/update-token', {
                method: 'POST',
                body: _token.refreshToken
            })
                .then(r => r.json());
    
            setToken(updatedToken);*/
            console.log("expired");
        }
    
        return _token && _token.accessToken;
    };

    const isLoggedIn = () => {
        return !!_token;
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    const setToken = (token: typeof _token) => {
        if (token) {
            localStorage.setItem('user', JSON.stringify(token));
        } else {
            localStorage.removeItem('user');
        }
        _token = token;
        notify();
    };

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

export const createAuthProvider = () => {

    /* Implementation */
    const tokenProvider = createTokenProvider();

    const login: typeof tokenProvider.setToken = (newTokens) => {
        tokenProvider.setToken(newTokens);
    };
    
    const logout = () => {
        tokenProvider.setToken(null);
    };

    const authFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        const token = await tokenProvider.getToken();
    
        init = init || {};
    
        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`,
        };
    
        return fetch(input, init);
    };

    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

        useEffect(() => {
            const listener = (newIsLogged: boolean) => {
                setIsLogged(newIsLogged);
            };

            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);

        return [isLogged];
};

    return {
        useAuth,
        authFetch,
        login,
        logout
    }
};

//export const {useAuth, authFetch, login, logout} = createAuthProvider();