import React from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorHandler from '../error-handler/ErrorHandler';


import "./Home.scss";

const query = gql`
  query {
    User {email}
  }
`;

function Home(props) {
  return (
    <div>
      <p>This is home. There will be a presentation fo the product.</p>
      <ErrorHandler>
        <Query query={query}>
          {({loading, error, data}) => {
            if(loading) return <div>Fetching</div>
            if(error) throw new Error(error)
            const users = data.User;
            return (
              users.map(user => <p>Email: {user.email}</p>)
            )
          }}
        </Query>
      </ErrorHandler>
    </div>
  );
}

export default Home;
