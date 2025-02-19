import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../_actions';

// https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks
// https://olinations.medium.com/10-steps-to-convert-a-react-class-component-to-a-functional-component-with-hooks-ab198e0fa139

function LoginPage(props) {
  const { loggingIn } = props;
  //   const [details, setDetails] = useState({username: "", password: ""})
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  };

  return (
    <div className="col-md-6 col-md-offset-3">
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          {submitted && !username
                            && <div className="help-block">Username is required</div>}
        </div>
        <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {submitted && !password
                            && <div className="help-block">Password is required</div>}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Login</button>
          {loggingIn
            && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          <Link to="/register" className="btn btn-link">Register</Link>
        </div>
      </form>
    </div>
  );
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
