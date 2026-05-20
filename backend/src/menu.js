const menu = {
    restaurant: {
        id: "intelligent_bistro",
        name: "The Intelligent Bistro",
        currency: "USD",
        taxRate: 0.08
    },

    categories: [
        {
            id: "sandwiches",
            name: "Sandwiches",
            description: "Stacked, toasted, and made to order"
        },
        {
            id: "bowls",
            name: "Bowls",
            description: "Fresh, filling, and customizable"
        },
        {
            id: "sides",
            name: "Sides",
            description: "Crispy favorites and shareables"
        },
        {
            id: "drinks",
            name: "Drinks",
            description: "Cold, refreshing beverages"
        },
        {
            id: "desserts",
            name: "Desserts",
            description: "Sweet finishes"
        }
    ],

    items: [
        {
            id: "spicy_chicken_sandwich",
            name: "Spicy Chicken Sandwich",
            description:
                "Crispy chicken breast, spicy aioli, pickles, lettuce, and toasted brioche.",
            categoryId: "sandwiches",
            basePrice: 10.99,
            image:
                "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800",
            available: true,
            popular: true,
            dietaryTags: ["spicy"],
            defaultModifiers: {
                spiceLevel: "medium",
                addOns: [],
                removals: []
            },
            modifierGroups: [
                {
                    id: "spiceLevel",
                    name: "Spice Level",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "mild", name: "Mild", priceDelta: 0 },
                        { id: "medium", name: "Medium", priceDelta: 0 },
                        { id: "hot", name: "Hot", priceDelta: 0 },
                        { id: "extra_hot", name: "Extra Hot", priceDelta: 0.5 }
                    ]
                },
                {
                    id: "addOns",
                    name: "Add-ons",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 4,
                    options: [
                        { id: "cheese", name: "Cheese", priceDelta: 1 },
                        { id: "bacon", name: "Bacon", priceDelta: 1.75 },
                        { id: "avocado", name: "Avocado", priceDelta: 1.5 },
                        { id: "extra_chicken", name: "Extra Chicken", priceDelta: 3 }
                    ]
                },
                {
                    id: "removals",
                    name: "Remove Ingredients",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 5,
                    options: [
                        { id: "no_pickles", name: "No Pickles", priceDelta: 0 },
                        { id: "no_lettuce", name: "No Lettuce", priceDelta: 0 },
                        { id: "no_aioli", name: "No Spicy Aioli", priceDelta: 0 },
                        { id: "no_bun", name: "No Bun", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "classic_bistro_burger",
            name: "Classic Bistro Burger",
            description:
                "Beef patty, cheddar, lettuce, tomato, onion, pickles, and house sauce.",
            categoryId: "sandwiches",
            basePrice: 11.99,
            image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
            available: true,
            popular: true,
            dietaryTags: [],
            defaultModifiers: {
                doneness: "medium",
                addOns: [],
                removals: []
            },
            modifierGroups: [
                {
                    id: "doneness",
                    name: "Doneness",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "medium_rare", name: "Medium Rare", priceDelta: 0 },
                        { id: "medium", name: "Medium", priceDelta: 0 },
                        { id: "medium_well", name: "Medium Well", priceDelta: 0 },
                        { id: "well_done", name: "Well Done", priceDelta: 0 }
                    ]
                },
                {
                    id: "addOns",
                    name: "Add-ons",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 4,
                    options: [
                        { id: "bacon", name: "Bacon", priceDelta: 1.75 },
                        { id: "fried_egg", name: "Fried Egg", priceDelta: 1.5 },
                        { id: "avocado", name: "Avocado", priceDelta: 1.5 },
                        { id: "extra_patty", name: "Extra Patty", priceDelta: 3.5 }
                    ]
                },
                {
                    id: "removals",
                    name: "Remove Ingredients",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 6,
                    options: [
                        { id: "no_cheddar", name: "No Cheddar", priceDelta: 0 },
                        { id: "no_tomato", name: "No Tomato", priceDelta: 0 },
                        { id: "no_onion", name: "No Onion", priceDelta: 0 },
                        { id: "no_pickles", name: "No Pickles", priceDelta: 0 },
                        { id: "no_house_sauce", name: "No House Sauce", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "veggie_garden_wrap",
            name: "Veggie Garden Wrap",
            description:
                "Roasted vegetables, hummus, greens, cucumber, tomato, and herb vinaigrette.",
            categoryId: "sandwiches",
            basePrice: 9.49,
            image:
                "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
            available: true,
            popular: false,
            dietaryTags: ["vegetarian"],
            defaultModifiers: {
                wrapType: "spinach",
                addOns: [],
                removals: []
            },
            modifierGroups: [
                {
                    id: "wrapType",
                    name: "Wrap Type",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "spinach", name: "Spinach Wrap", priceDelta: 0 },
                        { id: "whole_wheat", name: "Whole Wheat Wrap", priceDelta: 0 },
                        { id: "gluten_free", name: "Gluten-Free Wrap", priceDelta: 1 }
                    ]
                },
                {
                    id: "addOns",
                    name: "Add-ons",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 4,
                    options: [
                        { id: "feta", name: "Feta", priceDelta: 1 },
                        { id: "avocado", name: "Avocado", priceDelta: 1.5 },
                        { id: "grilled_chicken", name: "Grilled Chicken", priceDelta: 3 },
                        { id: "tofu", name: "Tofu", priceDelta: 2.5 }
                    ]
                },
                {
                    id: "removals",
                    name: "Remove Ingredients",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 5,
                    options: [
                        { id: "no_hummus", name: "No Hummus", priceDelta: 0 },
                        { id: "no_cucumber", name: "No Cucumber", priceDelta: 0 },
                        { id: "no_tomato", name: "No Tomato", priceDelta: 0 },
                        { id: "no_vinaigrette", name: "No Herb Vinaigrette", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "teriyaki_chicken_bowl",
            name: "Teriyaki Chicken Bowl",
            description:
                "Grilled chicken, jasmine rice, broccoli, carrots, scallions, and teriyaki glaze.",
            categoryId: "bowls",
            basePrice: 12.49,
            image:
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
            available: true,
            popular: true,
            dietaryTags: ["high_protein"],
            defaultModifiers: {
                base: "jasmine_rice",
                sauce: "teriyaki",
                addOns: [],
                removals: []
            },
            modifierGroups: [
                {
                    id: "base",
                    name: "Base",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "jasmine_rice", name: "Jasmine Rice", priceDelta: 0 },
                        { id: "brown_rice", name: "Brown Rice", priceDelta: 0 },
                        { id: "greens", name: "Mixed Greens", priceDelta: 0 },
                        { id: "half_rice_half_greens", name: "Half Rice, Half Greens", priceDelta: 0 }
                    ]
                },
                {
                    id: "sauce",
                    name: "Sauce",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "teriyaki", name: "Teriyaki", priceDelta: 0 },
                        { id: "spicy_mayo", name: "Spicy Mayo", priceDelta: 0 },
                        { id: "garlic_soy", name: "Garlic Soy", priceDelta: 0 },
                        { id: "sauce_on_side", name: "Sauce on the Side", priceDelta: 0 }
                    ]
                },
                {
                    id: "addOns",
                    name: "Add-ons",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 5,
                    options: [
                        { id: "extra_chicken", name: "Extra Chicken", priceDelta: 3 },
                        { id: "avocado", name: "Avocado", priceDelta: 1.5 },
                        { id: "fried_egg", name: "Fried Egg", priceDelta: 1.5 },
                        { id: "edamame", name: "Edamame", priceDelta: 1.25 }
                    ]
                },
                {
                    id: "removals",
                    name: "Remove Ingredients",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 5,
                    options: [
                        { id: "no_broccoli", name: "No Broccoli", priceDelta: 0 },
                        { id: "no_carrots", name: "No Carrots", priceDelta: 0 },
                        { id: "no_scallions", name: "No Scallions", priceDelta: 0 },
                        { id: "no_sesame", name: "No Sesame Seeds", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "mediterranean_grain_bowl",
            name: "Mediterranean Grain Bowl",
            description:
                "Quinoa, chickpeas, cucumber, tomato, olives, feta, greens, and lemon tahini.",
            categoryId: "bowls",
            basePrice: 11.49,
            image:
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
            available: true,
            popular: false,
            dietaryTags: ["vegetarian"],
            defaultModifiers: {
                dressing: "lemon_tahini",
                addOns: [],
                removals: []
            },
            modifierGroups: [
                {
                    id: "dressing",
                    name: "Dressing",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "lemon_tahini", name: "Lemon Tahini", priceDelta: 0 },
                        { id: "herb_vinaigrette", name: "Herb Vinaigrette", priceDelta: 0 },
                        { id: "dressing_on_side", name: "Dressing on the Side", priceDelta: 0 }
                    ]
                },
                {
                    id: "addOns",
                    name: "Add-ons",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 5,
                    options: [
                        { id: "grilled_chicken", name: "Grilled Chicken", priceDelta: 3 },
                        { id: "tofu", name: "Tofu", priceDelta: 2.5 },
                        { id: "extra_feta", name: "Extra Feta", priceDelta: 1 },
                        { id: "avocado", name: "Avocado", priceDelta: 1.5 }
                    ]
                },
                {
                    id: "removals",
                    name: "Remove Ingredients",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 6,
                    options: [
                        { id: "no_olives", name: "No Olives", priceDelta: 0 },
                        { id: "no_feta", name: "No Feta", priceDelta: 0 },
                        { id: "no_tomato", name: "No Tomato", priceDelta: 0 },
                        { id: "no_cucumber", name: "No Cucumber", priceDelta: 0 },
                        { id: "no_chickpeas", name: "No Chickpeas", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "truffle_fries",
            name: "Truffle Fries",
            description:
                "Crispy fries tossed with truffle oil, parmesan, parsley, and garlic aioli.",
            categoryId: "sides",
            basePrice: 6.49,
            image:
                "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800",
            available: true,
            popular: true,
            dietaryTags: ["vegetarian"],
            defaultModifiers: {
                size: "regular",
                sauces: ["garlic_aioli"],
                removals: []
            },
            modifierGroups: [
                {
                    id: "size",
                    name: "Size",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "regular", name: "Regular", priceDelta: 0 },
                        { id: "large", name: "Large", priceDelta: 2 }
                    ]
                },
                {
                    id: "sauces",
                    name: "Sauces",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 3,
                    options: [
                        { id: "garlic_aioli", name: "Garlic Aioli", priceDelta: 0 },
                        { id: "ketchup", name: "Ketchup", priceDelta: 0 },
                        { id: "ranch", name: "Ranch", priceDelta: 0.5 },
                        { id: "spicy_mayo", name: "Spicy Mayo", priceDelta: 0.5 }
                    ]
                },
                {
                    id: "removals",
                    name: "Remove Ingredients",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 3,
                    options: [
                        { id: "no_parmesan", name: "No Parmesan", priceDelta: 0 },
                        { id: "no_parsley", name: "No Parsley", priceDelta: 0 },
                        { id: "no_truffle_oil", name: "No Truffle Oil", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "sweet_potato_fries",
            name: "Sweet Potato Fries",
            description:
                "Crispy sweet potato fries served with smoky chipotle ranch.",
            categoryId: "sides",
            basePrice: 5.99,
            image:
                "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800",
            available: true,
            popular: false,
            dietaryTags: ["vegetarian"],
            defaultModifiers: {
                size: "regular",
                sauces: ["chipotle_ranch"]
            },
            modifierGroups: [
                {
                    id: "size",
                    name: "Size",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "regular", name: "Regular", priceDelta: 0 },
                        { id: "large", name: "Large", priceDelta: 2 }
                    ]
                },
                {
                    id: "sauces",
                    name: "Sauces",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 3,
                    options: [
                        { id: "chipotle_ranch", name: "Chipotle Ranch", priceDelta: 0 },
                        { id: "ketchup", name: "Ketchup", priceDelta: 0 },
                        { id: "honey_mustard", name: "Honey Mustard", priceDelta: 0.5 }
                    ]
                }
            ]
        },

        {
            id: "sparkling_water",
            name: "Sparkling Water",
            description: "Chilled sparkling mineral water.",
            categoryId: "drinks",
            basePrice: 2.99,
            image:
                "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800",
            available: true,
            popular: false,
            dietaryTags: ["vegan", "gluten_free"],
            defaultModifiers: {
                size: "regular",
                flavor: "plain"
            },
            modifierGroups: [
                {
                    id: "size",
                    name: "Size",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "regular", name: "Regular", priceDelta: 0 },
                        { id: "large", name: "Large", priceDelta: 1 }
                    ]
                },
                {
                    id: "flavor",
                    name: "Flavor",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "plain", name: "Plain", priceDelta: 0 },
                        { id: "lime", name: "Lime", priceDelta: 0 },
                        { id: "berry", name: "Berry", priceDelta: 0 },
                        { id: "grapefruit", name: "Grapefruit", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "iced_tea",
            name: "Iced Tea",
            description: "Fresh-brewed black tea served over ice.",
            categoryId: "drinks",
            basePrice: 3.49,
            image:
                "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
            available: true,
            popular: false,
            dietaryTags: ["vegan"],
            defaultModifiers: {
                size: "regular",
                sweetness: "unsweetened",
                lemon: "with_lemon"
            },
            modifierGroups: [
                {
                    id: "size",
                    name: "Size",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "regular", name: "Regular", priceDelta: 0 },
                        { id: "large", name: "Large", priceDelta: 1 }
                    ]
                },
                {
                    id: "sweetness",
                    name: "Sweetness",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "unsweetened", name: "Unsweetened", priceDelta: 0 },
                        { id: "lightly_sweet", name: "Lightly Sweet", priceDelta: 0 },
                        { id: "sweet", name: "Sweet", priceDelta: 0 }
                    ]
                },
                {
                    id: "lemon",
                    name: "Lemon",
                    type: "single",
                    required: false,
                    min: 0,
                    max: 1,
                    options: [
                        { id: "with_lemon", name: "With Lemon", priceDelta: 0 },
                        { id: "no_lemon", name: "No Lemon", priceDelta: 0 }
                    ]
                }
            ]
        },

        {
            id: "chocolate_lava_cake",
            name: "Chocolate Lava Cake",
            description:
                "Warm chocolate cake with a molten center and vanilla cream.",
            categoryId: "desserts",
            basePrice: 7.49,
            image:
                "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
            available: true,
            popular: true,
            dietaryTags: ["vegetarian"],
            defaultModifiers: {
                toppings: [],
                temperature: "warm"
            },
            modifierGroups: [
                {
                    id: "temperature",
                    name: "Temperature",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "warm", name: "Warm", priceDelta: 0 },
                        { id: "room_temp", name: "Room Temperature", priceDelta: 0 }
                    ]
                },
                {
                    id: "toppings",
                    name: "Toppings",
                    type: "multi",
                    required: false,
                    min: 0,
                    max: 3,
                    options: [
                        { id: "vanilla_cream", name: "Vanilla Cream", priceDelta: 0 },
                        { id: "strawberries", name: "Strawberries", priceDelta: 1 },
                        { id: "caramel", name: "Caramel Drizzle", priceDelta: 0.75 },
                        { id: "extra_chocolate", name: "Extra Chocolate", priceDelta: 0.75 }
                    ]
                }
            ]
        },

        {
            id: "new_york_cheesecake",
            name: "New York Cheesecake",
            description:
                "Creamy cheesecake with graham cracker crust and berry compote.",
            categoryId: "desserts",
            basePrice: 6.99,
            image:
                "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
            available: true,
            popular: false,
            dietaryTags: ["vegetarian"],
            defaultModifiers: {
                topping: "berry_compote"
            },
            modifierGroups: [
                {
                    id: "topping",
                    name: "Topping",
                    type: "single",
                    required: true,
                    min: 1,
                    max: 1,
                    options: [
                        { id: "berry_compote", name: "Berry Compote", priceDelta: 0 },
                        { id: "caramel", name: "Caramel", priceDelta: 0.75 },
                        { id: "chocolate", name: "Chocolate Sauce", priceDelta: 0.75 },
                        { id: "plain", name: "Plain", priceDelta: 0 }
                    ]
                }
            ]
        }
    ]
};

export { menu };