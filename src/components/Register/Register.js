import React, { useState } from 'react';

const Register = ({ onRouteChange, loadUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.name.trim() === '') {
      newErrors.name = 'name is required';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted');
      fetch('https://vast-peak-60013-6a6aa7dfe9ad.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user.id){        
            loadUser(user)
            onRouteChange('home');
        }
      })
    } else {
      console.log('Form not submitted. Check for errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  id="name"
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={handleSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    </form>
  );
};

export default Register;
