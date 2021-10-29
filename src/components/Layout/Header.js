import React, { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import mealsImg from '../../assets/meals.jpg';

const Header = (props) => {
  return <Fragment>
    <header className={classes.header}>
      <h1>My Meals</h1>
      <HeaderCartButton />
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImg} alt="A table with food" />
    </div>
  </Fragment>
};

export default Header;
