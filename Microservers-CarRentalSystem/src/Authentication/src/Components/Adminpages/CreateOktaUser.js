import { useForm } from "react-hook-form";
import { ApiUrls } from "../../Shared/ApiUrls";
import { ToastContainer } from "react-toastify";
import { ToastNotification } from "../../Shared/constants";
import { useState } from "react";

const CreateOktaUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [loader, setLoader] = useState(false);

  const hitActivateApi = async (apiLink) => {
    try {
     
      const response = await fetch(apiLink, {
        method: "POST",
        credentials:'include',
        headers: {
          Authorization: `${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      const result = response.json();
      
    } catch (err) {
     // console.log(err);
    } finally {
      setLoader(false);
      ToastNotification("User is created and activated succesfully", "success");
    }
  };
  const postOktaUserData = async (payload) => {
    try {
      const response = await fetch(ApiUrls.POST_OKTA_USER, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      const result = await response.json();
      if (response.status >= 400) {
        ToastNotification(result?.errorCauses[0]?.errorSummary, "error");
      } else if (response.status >= 200) {
        const activateUrl = result._links.activate.href;
        hitActivateApi(activateUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (data) => {
    setLoader(true);
    const payload = {
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        login: data.email,
        mobilePhone: data.mobilePhone,
      },
      credentials: {
        password: {
          value: data.password,
        },
      },
    };

    postOktaUserData(payload);
    reset();
  };

  return (
    <div className=" container">
      <div className="row mt-3">
        <div className="col-md-8 offset-2">
          <div className="card border-3 border-primary">
            <div className=" card-title m-auto text-center  h4 text-capitalize text-primary">
              CREATE OKTA USER FORM
              <hr />
            </div>
            <div className="card-body col-md-8 m-auto">
              <form onSubmit={handleSubmit(submitHandler)}>
                <input
                  type="text"
                  placeholder="Please enter first name"
                  className="form-control mt-2"
                  {...register("firstName", { required: true })}
                />
                {errors?.firstName ? (
                  <p className=" text-danger px-3 mt-1">
                    Please fill first name.
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  placeholder="Please enter last name"
                  className=" form-control mt-3"
                  {...register("lastName", { required: true })}
                />
                {errors?.lastName ? (
                  <p className=" text-danger px-3 mt-1">
                    Please fill last name.
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="email"
                  placeholder="Please enter email"
                  className=" form-control mt-3"
                  {...register("email", { required: true })}
                />
                {errors.email ? (
                  <p className="text-danger px-3 mt-1">Please fill email.</p>
                ) : (
                  ""
                )}

                <input
                  type="number"
                  className=" form-control mt-3"
                  placeholder="Please enter phone number"
                  {...register("mobilePhone", {
                    required: true,
                    maxLength: 10,
                  })}
                />
                {errors.mobilePhone ? (
                  <p className="text-danger px-3 mt-1">
                    Please fill the mobile number.
                  </p>
                ) : (
                  ""
                )}

                <input
                  type="text"
                  className=" form-control mt-3"
                  placeholder="Please enter password"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  })}
                />
                {errors.password ? (
                  <p className="text-danger px-3 mt-1">
                    Password must have Minimum eight characters, at least one
                    letter and one number and one sepcial character.
                  </p>
                ) : (
                  ""
                )}

                <input
                  type="text"
                  className=" form-control mt-3"
                  placeholder="Please enter confirm password"
                  {...register("confirm_password", {
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors.confirm_password ? (
                  <p className="text-danger px-3 mt-1">
                    Password doesnt match the confirm passwrod field.
                  </p>
                ) : (
                  ""
                )}

                <button
                  style={{ width: "150px" }}
                  disabled={loader}
                  className="btn btn-primary mt-3 px-lg-5"
                  type="submit"
                >
                  {loader ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default CreateOktaUser;
