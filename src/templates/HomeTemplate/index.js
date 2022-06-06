import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
          </div>
        );
      }}
    />
  );
};

export default HomeTemplate;
