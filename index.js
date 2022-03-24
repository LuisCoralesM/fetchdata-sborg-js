/**
 * npm jest (to test)
 * npm run start (run project)
 */

import fetch from "node-fetch";
import fs from "fs";

const url = "https://api.github.com/orgs/stackbuilders/repos";

// Fetch the API url
const fetchData = async (url) => {
    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;
};

// Get the stars sum of all repos
const getStarsSum = (data) => {
    return data.reduce((sum, repo) => sum + repo.stars, 0);
};

// Get the 5 latest updated repos
const sortReposByUpdateDate = (data) => {
    return data.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
    }).slice(0, 5);
};

// Get repos with more than 5 stars
const getReposWithFiveStars = (data) => {
    return data.filter(data => data.stars > 5);
}

// From the GitHub API response, get the needed data
const getRepoData = async (url) => {
    const data = await fetchData(url);
    return data.map(repo => ({
        repo_name: repo.full_name.split("/")[1], 
        url: repo.html_url, 
        updated_at: repo.updated_at, 
        stars: repo.stargazers_count
    }));
};

(async () => {
    const data = await getRepoData(url);

    // Write whole data json
    const wholeDataText = JSON.stringify(data);
    fs.writeFileSync('./data/whole_data.json', wholeDataText);

    // Write only the 5 repos (5)
    const updatedRecentlyText = JSON.stringify(sortReposByUpdateDate(data));
    fs.writeFileSync('./data/sorted_by_update_data.json', updatedRecentlyText);

    // Write only repos with more than 5 stars
    const fiveStarsText = JSON.stringify(getReposWithFiveStars(data));
    fs.writeFileSync('./data/five_stars_data.json', fiveStarsText);

    // Write only the total stars
    fs.writeFileSync('./data/stars_sum.txt', "Total stars: " + getStarsSum(data).toString());
})();