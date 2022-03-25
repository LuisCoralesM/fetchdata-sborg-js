const { getReposWithFiveStars, getStarsSum, sortReposByUpdateDate } = require("../src/index.js");
const fs = require("fs");

let text = fs.readFileSync("./data/whole_data.json");
let data = JSON.parse(text);

describe("Validation of data and sorts", function() {
    test("if the fetching returns something", async () => {
        expect(data).toBeTruthy();
    });

    test("if all repos have more than 5 stars", async () => {
        let sortedData = getReposWithFiveStars(data);
        const checkStars = (sortedData) => sortedData.every(value => value.stars > 5);
        expect(checkStars(sortedData)).toBe(true);
    });

    test("if the total stars sum is added correctly", () => {
        expect(getStarsSum(data)).toBe(592);
    });

    test("if the first repo update date is latest than the next one", () => {
        let sortedData = sortReposByUpdateDate(data);
        const checkDates = (sortedData) => new Date(sortedData[0].updated_at) >= new Date(sortedData[1].updated_at) ? true : false;
        expect(checkDates(sortedData)).toBe(true);
    });
});