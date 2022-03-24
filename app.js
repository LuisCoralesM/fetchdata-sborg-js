const { getRepoData, getReposWithFiveStars, getStarsSum, sortReposByUpdateDate } = require("./src/index");
const fs = require("fs");

/**
 * npm test (to test)
 * npm run start (run project)
 */

const url = "https://api.github.com/orgs/stackbuilders/repos";

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