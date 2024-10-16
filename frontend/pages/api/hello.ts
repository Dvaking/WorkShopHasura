import { GraphQLClient } from "graphql-request";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const client = new GraphQLClient("http://localhost:8080/v1/graphql", {
  headers: {
    "Authorization": "x-hasura-admin-secret:myadminsecretkey",
  },
});