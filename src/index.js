const axios = require("axios");

// Fetch the API url
const fetchData = async (url) => {
    const response = await axios.get(url);

    return response.data;
}

// Get the stars sum of all repos
module.exports.getStarsSum = (data) => {
    return data.reduce((sum, repo) => sum + repo.stars, 0);
}

// Get the 5 latest updated repos
module.exports.sortReposByUpdateDate = (data) => {
    return data.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
    }).slice(0, 5);
}

// Get repos with more than 5 stars
module.exports.getReposWithFiveStars = (data) => {
    return data.filter(data => data.stars > 5);
}

// From the GitHub API response, get the needed data
module.exports.getRepoData = async (url) => {
    const data = await fetchData(url);
    return data.map(repo => ({
        repo_name: repo.full_name.split("/")[1], 
        url: repo.html_url, 
        updated_at: repo.updated_at, 
        stars: repo.stargazers_count
    }));
}