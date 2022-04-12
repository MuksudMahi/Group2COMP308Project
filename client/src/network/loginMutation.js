import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken, useAuthUserToken } from "../config/auth";

export const loginMutationGQL = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      id
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [__, setAuthUserToken, removeAuthUsertoken] = useAuthUserToken();

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      setAuthToken(data.login.token);
      setAuthUserToken(data.login.id);
    },
  });

  // full login function
  const login = (user, password) => {
    removeAuthtoken();
    removeAuthUsertoken();
    console.log(user, password);
    return mutation({
      variables: {
        username: user,
        password,
      },
    });
  };
  return [login, mutationResults];
};
