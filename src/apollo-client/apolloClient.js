import gql from 'graphql-tag';

// TODO add the required fields for signup
const signupMutation = gql`
    mutation Signup($email: String!, $memberId: Int, $password: String!) {
        signup (input: {email: $email, memberId: $memberId, password: $password}) {
            token, 
            message
        }
    }
`;

const loginMutation = gql`
    mutation Login($login: String!, $password: String!) {
        login(input: {login:$login, password:$password}) {
            token 
            message
        }
    }
`;

export {loginMutation, signupMutation};