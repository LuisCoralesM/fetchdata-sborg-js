const axios = require("axios");
const fs = require("fs")

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
    let urlBuilder = (page) => url + `?per_page=100&page=${page}`;

    const recursiveData = async (page = 1, dataFetch) => {   
        const fetchedData = await fetchData(urlBuilder(page));

        if (fetchedData.length === 0) return dataFetch;

        return recursiveData(page + 1, dataFetch.concat(fetchedData));
    }

    const fetchedData = await recursiveData(1, []);

    return fetchedData.map(repo => ({
        repo_name: repo.full_name.split("/")[1],
        url: repo.html_url,
        updated_at: repo.updated_at,
        stars: repo.stargazers_count
    }));
}

// From the mock files path (ONLY FOR TESTING TO AVOID REQUESTS LIMIT FROM API)
module.exports.getMockedRepoData = (dire) => {
    let path = (page) => dire + page + ".json";

    const recursiveData = (page = 1, dataFetch = []) => {  
        
        const getData = fs.readFileSync(path(page));
        const data = JSON.parse(getData);

        if (data.length === 0) return dataFetch;

        return recursiveData(page + 1, dataFetch.concat(data));
    }

    return recursiveData(1, []);
}