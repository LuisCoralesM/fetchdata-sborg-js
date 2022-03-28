const { getReposWithFiveStars, getStarsSum, sortReposByUpdateDate, getMockedRepoData } = require("../src/index.js");
const fs = require("fs");

let wholeDataText = fs.readFileSync("./data/whole_data.json");
let wholeData = JSON.parse(wholeDataText);

describe("Validation of data and sorts", function() {
    test("if the fetching returns something valid", async () => {
        expect(wholeData).toBeTruthy();
    });

    test("if all repos have more than 5 stars", async () => {
        let sortedData = getReposWithFiveStars(wholeData);
        const checkStars = (sortedData) => sortedData.every(value => value.stars > 5);
        expect(checkStars(sortedData)).toBe(true);
    });

    test("if the total stars sum is added correctly", () => {
        expect(getStarsSum(wholeData)).toBe(592); // How to not hard code
    });

    test("if the first repo update date is latest than the next one", () => {
        let sortedData = sortReposByUpdateDate(wholeData);
        const checkDates = (sortedData) => new Date(sortedData[0].updated_at) >= new Date(sortedData[1].updated_at) ? true : false;
        expect(checkDates(sortedData)).toBe(true);
    });
});

describe("new tests", () => {
    /*---------------------------------------------*/
    test("if the function returns something valid from the mocked repos", () => {
        expect(getMockedRepoData("./mock/3_entries/data")).toBeTruthy();
    });

    test("when there is just one 5 star repo", () => {
        let data = getMockedRepoData("./mock/1_5_star/data");
        expect(getReposWithFiveStars(data).length === 0).toBe(true);
    });

    test("when there is just one 6 star repo", () => {
        let data = getMockedRepoData("./mock/1_6_star/data");
        expect(getReposWithFiveStars(data).length === 1).toBe(true);
    });

    test("if the fetching returns correctly the only existing info (100 entries and an empty file)", () => {
        expect(getMockedRepoData("./mock/2_entries/data").length).toBe(100);
    });

    test("if the fetching returns correctly the only existing info (199 entries, two different files and an empty one)", () => {
        expect(getMockedRepoData("./mock/3_entries/data").length).toBe(199);
    });

    test("if the total sum of the stars is correct (100 stars)", () => {
        let data = getMockedRepoData("./mock/100_stars/data");
        expect(getStarsSum(data)).toBe(100);
    });

    test("if the date sorting is descending and correct", () => {
        let data = getMockedRepoData("./mock/different_updates/data");
        let sortedData = sortReposByUpdateDate(data);
        const checkDates = (sortedData) => new Date(sortedData[0].updated_at) >= new Date(sortedData[1].updated_at) ? true : false;
        expect(checkDates(sortedData)).toBe(true);
    });

    test("if the repos have no stars at all", () => {
        let data = getMockedRepoData("./mock/no_stars/data");
        expect(getStarsSum(data)).toBe(0);
    });

    test("if the repos have no stars at all, but filter all repos with more than 5 stars", () => {
        let data = getMockedRepoData("./mock/no_stars/data");
        expect(getReposWithFiveStars(data).length === 0).toBe(true);
    });
});