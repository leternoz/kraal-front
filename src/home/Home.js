import React from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';

import ErrorBoundary from '../error-handler/ErrorBoundary';


import "./Home.scss";

const query = gql`
  query {
    User {email}
  }
`;

function Home(props) {
  const { t } = useTranslation();

  return (
    <div>
      <p>This is home. There will be a presentation fo the product.</p>
      <ErrorBoundary>
        <Query query={query}>
          {({loading, error, data}) => {
            if(loading) return <div>Fetching</div>;
            if(error) throw new Error(t("error.fetch"));
            const users = data.User;
            return (
              users.map(user => <p>Email: {user.email}</p>)
            )
          }}
        </Query>
      </ErrorBoundary>
    </div>
  );
}

export default Home;
