import { GraphQLServer } from "graphql-yoga";
import * as proxy from "http-proxy-middleware";

import Query from "./query";
import Mutation from "./mutation";

const baseURL = process.env.API_URL || "http://localhost:3000";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  context: request => ({
    ...request,
    baseURL
  }),
  resolvers: {
    Query,
    Mutation
  }
});

server.express.use(
  proxy("/upload/**", {
    target: baseURL,
    pathRewrite: {
      "^/upload/(.*)": "/expenses/$1"
    }
  })
);

server.express.use(proxy("/receipts/**", { target: baseURL }));

const options = {
  port: process.env.PORT || 8000,
  endpoint: "/graphql",
  playground: "/playground"
};

server.start(options, ({ port }) =>
  console.log(`GraphQL server started on port ${port}`)
);
