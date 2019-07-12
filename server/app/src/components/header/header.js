import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from '../../actions';
import './header.scss';

const Header = ({loggedIn, login}) => {
    if (loggedIn) {
        return (
            <header  className="header">
                <div className="header__left">
                    <div className="header__left__label">Your Local Financier</div>
                </div>
                <div className="header__right">
                    <Link to='/' className="header__right__link">
                        Menu
                    </Link>
                    <Link to='/' className="header__right__link">
                        {/* <img className="header__cart" src={cartIcon} alt="cart"></img> */}
                        Total: 10 $
                    </Link>
                </div>
            </header>
        )
    } else {
        return (
            <header className="header">
                <div className="header__right">
                    <Link to='/' className="header__right__link">
                        Menu
                    </Link>
                    <Link to='/' className="header__right__link">
                        {/* <img className="header__cart" src={cartIcon} alt="cart"></img> */}
                        Total: 10 $
                    </Link>
                    <button onClick={() => login()} className="header__right__link">
                        Login
                    </button>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}
const mapDispatchToProps = {
    login
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);