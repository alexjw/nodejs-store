import * as Graphql from "graphql"

const Schema = Graphql.buildSchema(
    `type RootQuery {
        hello: TestData!
    }
    
    type TestData {
        text: String!
        views: Int!
    }
    
    schema {
        query: RootQuery
    }`
);

export default Schema;
