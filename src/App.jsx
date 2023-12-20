import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // handle user input
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // write data to the database
  const sendDataToDb = () => {
    const { firstName, lastName, email, password } = formData;
    const db = getDatabase();

    // insert one data only at a time
    // set(ref(db, "users/"), {
    //   userFirstname: firstName,
    //   userLastname: lastName,
    //   userEmail: email,
    //   userPassword: password,
    // });

    // insert multiple data at a time
    set(push(ref(db, "users/")), {
      userFirstname: firstName,
      userLastname: lastName,
      userEmail: email,
      userPassword: password,
    });
  };

  // handle submit
  const handleSubmit = () => {
    console.log(formData);
    sendDataToDb();
  };

  return (
    <div className="user_form">
      <div className="container">
        <div className="form_wrapper">
          <div className="main_form">
            <h1 className="form_heading">User Registration</h1>
            <div className="content">
              <label htmlFor="firstname">First Name</label>
              <input
                onChange={handleForm}
                className="firstname"
                type="text"
                placeholder="Enter Firstname"
                required
                name="firstName"
              />
            </div>
            <div className="content">
              <label htmlFor="lastname">Last Name</label>
              <input
                onChange={handleForm}
                className="lastname"
                type="text"
                placeholder="Enter Lastname"
                required
                name="lastName"
              />
            </div>
            <div className="content">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleForm}
                className="email"
                type="email"
                placeholder="Enter Email"
                required
                name="email"
              />
            </div>
            <div className="content">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleForm}
                className="password"
                type="password"
                placeholder="Enter Password"
                required
                name="password"
              />
            </div>
            <button className="addBtn" onClick={handleSubmit}>
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
