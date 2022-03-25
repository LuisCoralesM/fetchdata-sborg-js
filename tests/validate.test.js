const { getRepoData, getReposWithFiveStars, getStarsSum, sortReposByUpdateDate } = require("../src/index.js");

const url = "https://api.github.com/orgs/stackbuilders/repos?per_page=100";

let data;


describe('Validation of data and sorts', function() {

    test("if the fetching returns something", async () => {
        data = await getRepoData(url);
        expect(data).toBeTruthy();
    });

    test("if the total stars sum is added correctly", () => {
        expect(getStarsSum(data)).toBe(592);
    });
    
    it("", async () => {
        let data = await getRepoData(url);
        console.log(data.length);
        expect(data.length).toBeGreaterThanOrEqual(1);
    });
});

