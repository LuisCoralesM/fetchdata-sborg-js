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
    let urlBuilder = (page) => url + `?per_page=100&page=${page}`;

    const recursiveData = async (page = 1, dataFetch = []) => {   
        const fetchedData = await fetchData(urlBuilder(page));
        console.log(fetchedData);

        console.log('RUN', fetchedData.length, dataFetch.length)
        if (fetchedData.length === 0) {
            console.log("AA");
            return dataFetch
        } else {
            await recursiveData(page + 1, dataFetch.concat(fetchedData))
        }
    }
    const datass = await recursiveData(1, [])

    console.log(datass)
    return []
    // let url2 = new URL(url);
    // const data = [];

    ///   const fetchedData = await fetchData(url

    // if(Number(url2.searchParams.get('per_page')) === data.length)
    // {

    // }

    // return fetchedData.map(repo => ({
    //     repo_name: repo.full_name.split("/")[1],
    //     url: repo.html_url,
    //     updated_at: repo.updated_at,
    //     stars: repo.stargazers_count
    // }));
}