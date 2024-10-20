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
                    id: 1,
                    name: "John Doe",
                    amount: 5,
                    userId: 5
                },
                {
                    id: 2,
                    name: "John Doe",
                    amount: 7,
                    userId: 5
                },
                {
                    id: 3,
                    name: "John Doe",
                    amount: 10,
                    userId: 5
                }
            ],
            endDate: new Date(2024, 10, 19, 23, 59, 59)
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
            currentPrice: 5,
            bidders: [
                {
                    name: "John Doe",
                    amount: 5,
                    userId: 5
                }
            ],
            endDate: new Date(2024, 10, 31, 23, 59, 59)
        }
    },
    {
        id: 3,
        name: "The Witcher 3: Wild Hunt",
        genre: genre[2].name,
        description: "An open-world role-playing game set in a fantasy universe",
        slug: "witcher-3",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0714/ojKZ7l0T2M5egR9YHIjVhI0R.png",
        producer: "CD Projekt Red",
        consoles: [
            "PC",
            "Playstation 4",
            "Xbox one",
            "Nintendo Switch"
        ],
        auction: {
            startingPrice: 20,
            currentPrice: 35,
            bidders: [
                {
                    name: "Jane Smith",
                    amount: 25,
                    userId: 6
                },
                {
                    name: "Chris Brown",
                    amount: 30,
                    userId: 3
                },
                {
                    name: "Alex Johnson",
                    amount: 35,
                    userId: 4
                }
            ],
            endDate: new Date(2024, 10, 20, 18, 0, 0)
        }
    },
    {
        id: 4,
        name: "FIFA 23",
        genre: genre[3].name,
        description: "A football simulation video game",
        slug: "fifa-23",
        image: "https://assetsio.gnwcdn.com/co4zw5.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
        producer: "EA Sports",
        consoles: [
            "Playstation 5",
            "Playstation 4",
            "Xbox Series X",
            "PC"
        ],
        auction: {
            startingPrice: 15,
            currentPrice: 25,
            bidders: [
                {
                    name: "Chris Brown",
                    amount: 20,
                    userId: 3
                },
                {
                    name: "John Doe",
                    amount: 25,
                    userId: 5
                }
            ],
            endDate: new Date(2024, 10, 25, 20, 30, 0)
        }
    },
    {
        id: 5,
        name: "The Legend of Zelda: Breath of the Wild",
        genre: genre[4].name,
        description: "An open-world action-adventure game",
        slug: "zelda-breath-of-the-wild",
        image: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
        producer: "Nintendo",
        consoles: [
            "Nintendo Switch",
            "Wii U"
        ],
        auction: {
            startingPrice: 30,
            currentPrice: 50,
            bidders: [
                {
                    name: "John Doe",
                    amount: 40,
                    userId: 5
                },
                {
                    name: "Alex Johnson",
                    amount: 45,
                    userId: 4
                },
                {
                    name: "Jane Smith",
                    amount: 50,
                    userId: 6
                }
            ],
            endDate: new Date(2024, 10, 30, 12, 0, 0)
        }
    },
    {
        id: 6,
        name: "Red Dead Redemption 2",
        genre: genre[2].name,
        description: "An open-world action-adventure game set in the Wild West",
        slug: "red-dead-redemption-2",
        image: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png",
        producer: "Rockstar Games",
        consoles: [
            "Playstation 4",
            "Xbox one",
            "PC"
        ],
        auction: {
            startingPrice: 25,
            currentPrice: 40,
            bidders: [
                {
                    name: "Jane Smith",
                    amount: 35,
                    userId: 6
                },
                {
                    name: "Chris Brown",
                    amount: 40,
                    userId: 3
                }
            ],
            endDate: new Date(2024, 11, 1, 22, 0, 0)
        }
    },
    {
        id: 7,
        name: "Super Smash Bros. Ultimate",
        genre: genre[4].name,
        description: "A crossover fighting game",
        slug: "super-smash-bros-ultimate",
        image: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9",
        producer: "Nintendo",
        consoles: [
            "Nintendo Switch"
        ],
        auction: {
            startingPrice: 10,
            currentPrice: 18,
            bidders: [
                {
                    name: "John Doe",
                    amount: 15,
                    userId: 5
                },
                {
                    name: "Alex Johnson",
                    amount: 18,
                    userId: 4
                }
            ],
            endDate: new Date(2024, 11, 2, 19, 0, 0)
        }
    },
    {
        id: 8,
        name: "Halo Infinite",
        genre: genre[0].name,
        description: "A first-person shooter in the Halo series",
        slug: "halo-infinite",
        image: "https://store-images.s-microsoft.com/image/apps.21536.13727851868390641.c9cc5f66-aff8-406c-af6b-440838730be0.68796bde-cbf5-4eaa-a299-011417041da6",
        producer: "343 Industries",
        consoles: [
            "Xbox Series X",
            "Xbox one",
            "PC"
        ],
        auction: {
            startingPrice: 15,
            currentPrice: 25,
            bidders: [
                {
                    name: "Jane Smith",
                    amount: 20,
                    userId: 6
                },
                {
                    name: "Chris Brown",
                    amount: 25,
                    userId: 3
                }
            ],
            endDate: new Date(2024, 10, 21, 21, 30, 0)
        }
    },
    {
        id: 9,
        name: "Cyberpunk 2077",
        genre: genre[5].name,
        description: "An open-world action role-playing game set in a dystopian future",
        slug: "cyberpunk-2077",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg",
        producer: "CD Projekt Red",
        consoles: [
            "Playstation 4",
            "Xbox one",
            "PC",
            "Playstation 5"
        ],
        auction: {
            startingPrice: 10,
            currentPrice: 20,
            bidders: [
                {
                    name: "John Doe",
                    amount: 15,
                    userId: 5
                },
                {
                    name: "Alex Johnson",
                    amount: 20,
                    userId: 4
                }
            ],
            endDate: new Date(2024, 10, 28, 17, 0, 0)
        }
    },
    {
        id: 10,
        name: "Resident Evil Village",
        genre: genre[6].name,
        description: "A survival horror game",
        slug: "resident-evil-village",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202101/0812/FkzwjnJknkrFlozkTdeQBMub.png",
        producer: "Capcom",
        consoles: [
            "Playstation 5",
            "Playstation 4",
            "PC",
            "Xbox Series X"
        ],
        auction: {
            startingPrice: 20,
            currentPrice: 30,
            bidders: [
                {
                    name: "Chris Brown",
                    amount: 25,
                    userId: 3
                },
                {
                    name: "Jane Smith",
                    amount: 30,
                    userId: 6
                }
            ],
            endDate: new Date(2024, 11, 3, 23, 0, 0)
        }
    }
];