// import { GraphQLClient } from "graphql-request";
import { gql } from "@apollo/client";

// const client = new GraphQLClient("http://localhost:9000/graphql", {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return { Authorization: `Bearer ${accessToken}` };
//     }
//     return {};
//   },
// });

// const httpLink = createHttpLink({ uri: "http://localhost:9000/graphql" });

// const authLink = new ApolloLink((operation, forward) => {
//   const accessToken = getAccessToken();
//   if (accessToken) {
//     operation.setContext({
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//   }

//   return forward(operation);
// });

// const apolloClient = new ApolloClient({
//   link: concat(authLink, httpLink),
//   cache: new InMemoryCache(),
// });

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`;

// const jobByIdQuery = gql`
//   query JobById($id: ID!) {
//     job(id: $id) {
//       ...JobDetail
//     }
//   }
//   ${jobDetailFragment}
// `;

export const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;
