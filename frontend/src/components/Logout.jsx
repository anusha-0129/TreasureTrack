import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './actions/authAction';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logout());
      navigate('/');
    };
    handleLogout();
  }, [dispatch, navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
