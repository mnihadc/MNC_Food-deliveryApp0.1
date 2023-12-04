import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      
      <Outlet />
    </div>
  );
}

export default PrivateRoute;
