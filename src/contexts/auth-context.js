import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  access_token: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    console.log('Auth-context: initialize', {
      ...state,
      ...(action.payload)
    });
    return {
      ...state,
      ...(action.payload),
      isLoading: false,
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    console.log('Auth-context: singIn');
    const { user, access_token} = action.payload;

    window.sessionStorage.setItem('authenticated', 'true');
    window.sessionStorage.setItem('user', JSON.stringify(user));
    window.sessionStorage.setItem('access_token', access_token);

    return {
      ...state,
      isAuthenticated: true,
      user,
      access_token,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    console.log('Auth-context: singOut');
    
    window.sessionStorage.setItem('authenticated', 'false');
    window.sessionStorage.setItem('user', '');
    window.sessionStorage.setItem('access_token', '');

    return {
      ...state,
      isAuthenticated: false,
      user: null,
      access_token: null,
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    try {
      const isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      const user = JSON.parse(window.sessionStorage.getItem('user'));
      const access_token = window.sessionStorage.getItem('access_token');

      return dispatch({
        type: HANDLERS.INITIALIZE,
        payload: {
          isAuthenticated,
          user,
          isLoading: Boolean(user),
          access_token,
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/signin",  
        responseType: 'json',
        data: {
          username: username,
          password,
        }
      });  

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: {
          user: {
            _username: response.data._authenticatedUser.username,
          },
          access_token: response.data._token
        }
      });
    } catch (loginError) {
      throw new Error(loginError.response.data.message)
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
