import Categories from '@components/Categories';
import { Link, Navbar, NavLeft, NavRight, NavTitle, Page } from 'framework7-react';
import React from 'react';

const HomePage = () => (
  <Page name="home">
    <Navbar>
      <NavLeft>
        <Link icon="las la-bars" panelOpen="left" />
      </NavLeft>
      <NavTitle>SUNFUME</NavTitle>
      <NavRight>
        <Link href="/line_items" iconF7="cart" iconBadge={3} badgeColor="red" />
      </NavRight>
    </Navbar>
    <Categories />
  </Page>
);
export default React.memo(HomePage);
