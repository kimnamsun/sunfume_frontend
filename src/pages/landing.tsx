import React from 'react';
import { Page } from 'framework7-react';
import spinner from '../assets/images/spinner.gif';

const LandingPage = () => (
  <Page>
    <div className="w-full h-screen flex justify-center items-center">
      <img src={spinner} alt="loading-spinner" className="w-20 h-20" />
    </div>
  </Page>
);

export default LandingPage;
