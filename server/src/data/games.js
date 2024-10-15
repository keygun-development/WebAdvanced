import genre from "./genres.js";

export default [
    {
        id: 1,
        name: "Black ops II",
        genre: genre[0].name,
        description: "A Shooter from the Call of Duty series",
        slug: "black-ops-2",
        image: "/assets/games/black-ops-2.png",
        producer: "Treyarch",
        consoles: [
            "Xbox 360",
            "Playstation 3",
            "PC"
        ],
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
            endDate: new Date(2024, 9, 15, 23, 59, 59)
        }
    },
    {
        id: 2,
        name: "Minecraft",
        genre: genre[1].name,
        description: "A sandbox game",
        slug: "minecraft",
        image: "/assets/games/minecraft.avif",
        producer: "Mojang",
        consoles: [
            "Xbox 360",
            "Playstation 3",
            "PC",
            "Playstation 4",
            "Xbox one"
        ],
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