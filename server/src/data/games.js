import genre from "./genres.js";

export default [
    {
        name: "Black ops II",
        genre: genre[0].name,
        description: "A Shooter from the Call of Duty series",
        slug: "black-ops-2",
        image: "/assets/games/black-ops-2.png",
        auction: {
            startingPrice: 0,
            currentPrice: 10,
            bidders: [
                {
                    name: "John Doe",
                    amount: 5
                },
                {
                    name: "John Doe",
                    amount: 7
                },
                {
                    name: "John Doe",
                    amount: 10
                }
            ],
            endDate: new Date(2024, 9, 14, 23, 59, 59)
        }
    },
    {
        name: "Minecraft",
        genre: genre[1].name,
        description: "A sandbox game",
        slug: "minecraft",
        image: "/assets/games/minecraft.avif",
        auction: {
            startingPrice: 1,
            currentPrice: 3,
            bidders: [
                {
                    name: "John Doe",
                    amount: 5
                }
            ],
            endDate: new Date(2021, 11, 31, 23, 59, 59)
        }
    }
];