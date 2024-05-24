import React from "react";
import { Route, Routes } from "react-router-dom";
import { authProtectedRoutes } from "./router";

const Index = () => {
  return (
    <Routes>
      {authProtectedRoutes.map((route, i) => {
        return (
          <Route
            path={route.path}
            key={i}
            element={
              route.publicRoutes === true ? (
                route.component
              ) : (
                <>{route.component}</>
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default Index;
