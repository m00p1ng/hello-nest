module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: 'nuber',
      url: 'http://localhost:3000/graphql'
    }
  }
}