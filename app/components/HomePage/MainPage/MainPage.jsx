import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import NavbarC from './Navbar/Navbar.C';
import SummaryListC from './SummaryList/SummaryList.C';

const MainPage = ({}) => {
  const [isFixed, setFixed] = useState(false);

  const scrollbottonEvent = event => {
    const top =
      event.target.pageYOffset || event.target.documentElement.scrollTop;
    if (top > 205) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollbottonEvent);
    return () => window.removeEventListener('scroll', scrollbottonEvent);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <NavbarC isFixed={isFixed} />
      <SummaryListC isFixed={isFixed} />
    </React.Fragment>
  );
};

export default MainPage;
