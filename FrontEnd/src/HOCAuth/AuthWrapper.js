import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const token = Cookies.get('token');
    const history = useHistory();

    useEffect(() => {
      if (!token) {
        history.push('/login');
        localStorage.clear("user");
      }
    }, [token, history]);

    return token ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
