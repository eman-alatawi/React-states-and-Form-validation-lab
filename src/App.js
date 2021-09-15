import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return <RegisterClient />;
  }
}

const validEmailRegex = RegExp(/\S+@\S+\.\S+/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class RegisterClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: null,
      email: null,
      password: null,
      errors: {
        clientName: "",
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "clientName":
        errors.clientName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      alert(`Client Registration Successful!!! `);
      this.setState({
        clientName: "",
        email: "",
        password: "",
        errors: {
          clientName: "",
          email: "",
          password: "",
        },
      });
      document.getElementById("registration-form").reset();
    } else {
      console.error("Invalid Form");
      alert(`Client Registration Failed!!!`);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Create Client Account</h2>
          <form onSubmit={this.handleSubmit} id="registration-form" noValidate>
            <div className="clientName">
              <label htmlFor="clientName">Full Name</label>
              <input
                type="text"
                name="clientName"
                onChange={this.handleChange}
                noValidate
              />
              {errors.clientName.length > 0 && (
                <span className="error">{errors.clientName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                noValidate
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                noValidate
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="info">
              <small>Password must be of minimum eight characters.</small>
            </div>
            <div className="submit">
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;