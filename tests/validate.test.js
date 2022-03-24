const { getRepoData, getReposWithFiveStars, getStarsSum, sortReposByUpdateDate } = require("../src/index.js");

const url = "https://api.github.com/orgs/stackbuilders/repos";


describe('Circle class', function() {
    describe('area is calculated when', function() {
        test("", async () => {
            let data = await getRepoData(url);
            console.log(data.length);
            expect(data.length).toBeGreaterThanOrEqual(1);
        });
    });
});

