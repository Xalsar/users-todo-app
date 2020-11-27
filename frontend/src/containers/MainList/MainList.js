import React, { useState, useEffect } from "react";
import axios from "axios";

const MainList = () => {
  useEffect(() => {
    axios.get("/api/users/").then(({ data }) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Barriletes!</h1>
    </div>
  );
};

export default MainList;
