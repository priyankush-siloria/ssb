import React, { useEffect } from "react";
import axios from "axios";

const Protected = () => {
  //hiting api
  const postData = async () => {
    try {
      const obj = JSON.parse(localStorage.getItem("okta-token-storage"));
      const payload = {
        accessToken: obj.accessToken.accessToken,
        refreshToken: obj.refreshToken.refreshToken,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/login/`,
        payload
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postData();
  }, []);
  return (
    <div className=" container">
      <div className="row">
        <div className="col-md-10 offset-1 mt-5">
          <h3 className="text-center py-5">You are Welcome</h3>
        </div>
      </div>
    </div>
  );
};

export default Protected;
