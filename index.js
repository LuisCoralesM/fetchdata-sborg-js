/**
 * npm jest (to test)
 * npm run start (run project)
 */

import fetch from "node-fetch";

const url = "https://api.github.com/orgs/stackbuilders/repos";

const fetchData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));
};

fetchData(url);