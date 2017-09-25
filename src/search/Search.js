import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from './actions';
import Pagination from '../search/Pagination';
import Card from '../search/Card';
import GlobalHeader from '../app/GlobalHeader';

export function Search({ search }) {
  console.log(786, search.length);

  if (search.length > 0 && !search.error) {
    return (
      <div>
        {search.map((person, index) => {
          return <Card key={index} user={person.info} />;
        })}
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

export default connect(mapStateToProps, null)(Search);