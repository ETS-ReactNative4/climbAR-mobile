import React from 'react';
import {Toolbar} from 'react-native-material-ui';

const Topnav = () => {
  return (
    <Toolbar
      leftElement="menu"
      centerElement="Searchable"
      searchable={{
        autoFocus: true,
        placeholder: 'Search',
      }}
      rightElement={{
        menu: {
          icon: 'more-vert',
          labels: ['item 1', 'item 2'],
        },
      }}
      onRightElementPress={label => {
        console.log(label);
      }}
    />
  );
};

export default Topnav;
