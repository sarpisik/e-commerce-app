import React from 'react';
import { getCurrentYear } from '../Helpers';

const Footer = () => (
  <footer className="bg-dark p-4">
    <p className="text-white text-center m-0">
      <span>&copy;</span>
      {`${getCurrentYear()} Sarp ISIK`}
    </p>
  </footer>
);

export default Footer;
