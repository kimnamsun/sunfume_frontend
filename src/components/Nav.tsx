import React from 'react';
import { Link, Navbar, NavLeft, NavRight, NavTitle, Searchbar, theme } from 'framework7-react';

const Nav = () => (
  <Navbar>
    <NavLeft>
      <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" />
    </NavLeft>
    <NavTitle>SUNFUME</NavTitle>
    <NavRight>
      <Link href="/line_items" iconF7="cart" iconBadge={3} badgeColor="red" />
    </NavRight>
    <Searchbar
      className="searchbar-demo"
      expandable
      searchContainer=".search-list"
      searchIn=".item-title"
      disableButton={!theme.aurora}
    />
  </Navbar>
);

export default Nav;
