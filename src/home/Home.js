import React from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      <Query query={query}>
        {({loading, error, data}) => {
          if(loading) return <div>Fetching</div>
          if(error) return <div>Error: {JSON.stringify(error)}</div>
          const users = data.User;
          return (
            users.map(user => <p>Email: {user.email}</p>)
          )
        }}
      </Query>
    </div>
  );
}

export default Home;
