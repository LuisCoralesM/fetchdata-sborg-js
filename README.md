# Fetch Stack Builders Repos

A JavaScript pet project that retrieve important info from the [Stack Builders](https://github.com/stackbuilders) organization repositories by using the [GitHub API](https://docs.github.com/en/rest).

## Features

- Scrape all repositories from the Stack Builders organization from the GitHub API.
    - For each repo, get its name, url, update date and stars.
- Get the repos data sorted by most recent updates (top 5).
- Get only the repos with more than 5 stars.
- Automated unit testing to check the fetched data, the sorting and filter functions work correctly.

## Package dependency

- [Axios](https://axios-http.com/docs/intro) →  HTTP client library
- [Jest](https://jestjs.io/) → Automated testing framework (DEV ONLY)

## How to run it?

Assuming you already have downloaded Node.JS and NPM: Clone or download the code and just run the following command on the directory:

`npm install`

_Wait for the package installation._

`npm run start`

_Wait for the execution of the code to get the fetched data as_ .json _files._

## How to test it?

By installing Jest and using the next command, you can validate all the fetched data is correct and all the functions work properly:

`npm test`

What the tests check:

-   Checks if the fetching returns something valid.
-   Checks if the getReposWithFiveStars works properly by checking each filtered repo.
-   Checks if the getStarsSum add stars to the total count correctly.
-   Checks if the sortReposByUpdateDate sorts each repo correctly by checking if the first repo update date is latest than the next one.
