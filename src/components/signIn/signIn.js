import Notiflix from 'notiflix';
import React, { useState } from 'react';

const SignIn = ({ onRouteChange, loadUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://vast-peak-60013-6a6aa7dfe9ad.herokuapp.com/signin', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }).then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              if (response.status === 400) {
                if (errorData === 'Wrong credentials') {
                  Notiflix.Notify.failure('Wrong credentials');
                } else if (errorData === 'incorrect form submission') {
                  Notiflix.Notify.failure('Incorrect form submission');
                } 
              }
            });
          }
          Notiflix.Notify.success('Login Successful');
          return response.json();
        })
        .then(user => {
          if (user && user.id) {
            loadUser(user);
            onRouteChange('home');
          } else {
            Notiflix.Notify.failure('Incorrect credentials');
          }
        })
      }

      return (
        <form onSubmit={handleSubmit}>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email"
                id="email-address" 
                value={formData.email}
                onChange={handleInputChange}                
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password" 
                value={formData.password}
                onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
              onClick = {handleSubmit} 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p onClick = {() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
        </article>
        </form>
          );
    }

export default SignIn;









