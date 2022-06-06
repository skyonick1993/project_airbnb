import React from "react";
import { Route } from "react-router-dom";

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return <Component {...propsRoute} />;
      }}
    />
  );
};

export default AdminTemplate;
