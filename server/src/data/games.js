import genre from "./genres.js";

export default [
    {
        name: "Black ops II",
        genre: genre[0].name,
        description: "A Shooter from the Call of Duty series",
        slug: "black-ops-2",
        auction: {
            startingPrice: 10,
            currentPrice: 10,
            bids: 0,
            endDate: new Date(2021, 11, 31, 23, 59, 59)
        }
    }
];