export const viewerUser = `{
    viewer {
        login
    }
}`;

export const searchRepository = (searchString: string) => `{
    search(query: "${searchString}", type: REPOSITORY, first: 5) {
        repositoryCount
        nodes {
          ... on Repository {
            url
            name
            description
            nameWithOwner
            databaseId
            repositoryTopics(first: 3) {
              nodes {
                topic {
                  name
                }
                url
              }
            }
            stargazers {
              totalCount
            }
            issues(states: OPEN) {
              totalCount
            }
          }
        }
      }
}`
