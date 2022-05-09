import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = props => {
  const { user, isLogin, isRegister } = props;

  const hasUser = sessionStorage['session'];

  const handleLogout = () => {
    props.logoutRequest({});
    sessionStorage.clear()
    props.history.push('/');
  }

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });
   
  return (
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt="ParkLot" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {hasUser ?
            <img src={gravatar(JSON.parse(sessionStorage['session']).email)} alt={JSON.parse(sessionStorage['session']).email} /> :
            <img src={userIcon} alt="" />
          }
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ?
            <li><a href="/">{JSON.parse(sessionStorage['session']).name}</a></li> 
            : null
          }
          {hasUser ? 
            <li><a href="/" onClick={handleLogout}>Cerrar Sesión</a></li>
            :
            <li>
              <Link to="/">
                Authenticate 
              </Link>
            </li>
          }
        </ul>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logoutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

