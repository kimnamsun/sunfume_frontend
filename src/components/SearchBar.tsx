import React from 'react';
import { Navbar, Subnavbar, Searchbar, theme } from 'framework7-react';

const SearchBar = () => (
  <Navbar title="Searchbar">
    <Subnavbar inner={false}>
      <Searchbar searchContainer=".search-list" searchIn=".item-title" disableButton={!theme.aurora} />
    </Subnavbar>
  </Navbar>
);

export default SearchBar;
