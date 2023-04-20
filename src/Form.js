import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //registerdata
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  //logindata
  function handleLoginChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setFormData({
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    });
  }

  function handleLogin(e) {}

  return (
    <>
      <div class="container-fluid d-flex flex-row justify-content-center p-5 form">
        <section class="d-flex flex-column justify-content-center align-items-center m-3 gap-3">
          <div
            class="d-flex flex-column border rounded p-3 bg-light"
            // onsubmit={handleSubmit}
          >
            <div class="mb-3 d-flex flex-row gap-3">
              {/* <!-- <label for="fname" class="form-label">First Name</label> --> */}
              <input
                name="fname"
                placeholder="first name"
                type="fname"
                class="form-control form-control-lg"
                id="fname"
                aria-describedby="fname"
                onChange={handleChange}
                value={formData.fname}
              />
              {/* <!-- <label for="lname" class="form-label">Last Name</label> --> */}
              <input
                name="lname"
                placeholder="last name"
                type="lname"
                class="form-control form-control-lg"
                id="lname"
                aria-describedby="lname"
                onChange={handleChange}
                value={formData.lname}
              />
            </div>
            <div class="mb-3">
              {/* <!-- <label for="exampleInputEmail1" class="form-label">Email address</label> --> */}
              <input
                name="email"
                placeholder="email address"
                // type="email"
                class="form-control form-control-lg"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div class="mb-3">
              {/* <!-- <label for="exampleInputPassword1" class="form-label">Password</label> --> */}
              <input
                name="password"
                placeholder="password"
                type="password"
                class="form-control form-control-lg"
                id="password"
                minLength={8}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div class="mb-3">
              {/* <!-- <label for="exampleInputPassword1" class="form-label">Password</label> --> */}
              <input
                name="cpassword"
                placeholder="confirm password"
                type="cpassword"
                class="form-control form-control-lg"
                id="cpassword"
                minLength={8}
                onChange={handleChange}
                value={formData.cpassword}
                autoComplete
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              class="btn btn-success"
            >
              Register
            </button>
          </div>
          <div class="d-flex w-100 flex-column border rounded p-3 bg-light">
            <div class="mb-3">
              {/* <!-- <label for="exampleInputEmail1" class="form-label">Email address</label> --> */}
              <input
                name="email"
                placeholder="email address"
                type="email"
                class="form-control form-control-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              {/* <!-- <label for="exampleInputPassword1" class="form-label">Password</label> --> */}
              <input
                name="password"
                placeholder="password"
                type="password"
                class="form-control form-control-lg"
                id="exampleInputPassword1"
                minLength={8}
              />
            </div>
            <button onclick={handleLogin} class="btn btn-primary">
              Login
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Form;
