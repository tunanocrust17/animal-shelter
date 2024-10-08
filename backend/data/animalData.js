const dogData = [
    {
        speciesID: 1,
        species: "Dogs",
        id: 1,
        name: "Cocoa Puff",
        age: "8 months",
        img: "https://images.unsplash.com/photo-1529467037979-99d067b7677d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hvY29sYXRlJTIwbGFifGVufDB8fDB8fHww",
        intro: "Hi there! I'm Cocoa Puff, and I’m ready to be your new best friend! Got treats? 😋",
        about: "Hi, I’m Cocoa Puff, your resident chocolate lab and expert in all things fun! Whether I’m puddle-jumping, chasing falling leaves, or sneaking snacks when no one's watching, I’m always on the lookout for adventure. My squeaky taco is my best friend, but I’ll never say no to a good tug-of-war with my floppy dino. Oh, and if you're missing a sock, I probably borrowed it for my collection. I’ve got a tail that drums, a snore that whispers, and a heart that loves belly rubs. Life’s better with a wag!",
        hobbies: [
            "Puddle Jumping: Cocoa Puff LOVES finding puddles after it rains and leaping in with a splash, much to everyone's amusement (or horror).",
            "Leaf Chase: Every autumn, Cocoa Puff turns into a leaf-hunter, darting around the yard to catch them as they float down.",
            "Snack Stealth: Sneaking into the kitchen when no one is looking to expertly nudge treats off the counter. It's all about the thrill of the chase."
        ],
        faveToys: [
            "Squeaky Taco: Cocoa Puffs all-time favorite squeaky toy shaped like a taco. The moment it squeaks, the zoomies commence.",
            "Chew Kong: Filled with peanut butter, it is the ultimate puzzle challenge and snack combo.",
            "Floppy Dino: A stuffed dinosaur with floppy arms that make it the perfect companion for tug-of-war battles."
        ],
        habits: [
            "Tail Drummer: Cocoa Puff has a habit of wagging his tail against doors or walls like he’s playing an imaginary drum set—usually right when you're trying to have a quiet moment.",
            "Sock Thief Extraordinaire: No sock is safe. Cocoa Puff loves finding stray socks and hiding them in his secret stash under the couch.",
            "Snore Whisperer: Sometimes, Cocoa Puff snores in such a soft, rhythmic way that it almost sounds like he's whispering sweet doggy dreams."
        ]
    },
    {
        speciesID: 1,
        species: "Dogs",
        id: 2,
        name: "Rusty",
        age: "5 months",
        img: "https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fHwy",
        about: "Hi, I’m Rusty, your adventurous little brown husky! I’m always ready for excitement, whether it’s digging snow tunnels, blazing my own trails in the yard, or joining in on a moonlit serenade with my signature howls. My plush squirrel is my trusty sidekick, and I can’t resist the thrill of chasing ice cubes around the kitchen floor. You might find me splashing water out of my bowl before taking a dainty sip—it's my way of adding a bit of drama to snack time. Oh, and if you’re missing a sock, don’t worry; it’s just adding character to my secret stash! Life is an adventure, and I can’t wait to explore it with you!",
        intro: "Husky Howl Choir: Every time you start singing (or just play some music), Rusty joins in with a signature husky howl to add her own twist to the tune.",
        hobbies: [
            "Snow-Digging Expert: Even if there's just a dusting of snow, Rusty loves digging tunnels and pretending to be on a grand Arctic expedition.",
            "Trail Blazer: Rusty has a passion for blazing new trails around the yard or park, even if that means circling the same tree five times. It’s all about the journey!"
        ],
        faveToys: [
            "Ice Cube Fetch: Rusty's favorite game is chasing ice cubes around the kitchen floor—cool and fun!",
            "Plush Squirrel: Rusty's trusty sidekick is a squeaky stuffed squirrel that’s the target of endless games of catch and wrestling matches.",
            "Frozen Tug Rope: Rusty enjoys a good challenge, especially when her tug rope has been left in the freezer for a frosty tug-of-war session."
        ],
        habits: [
            "Moon-Watcher: Rusty has a habit of sitting by the window and quietly staring at the moon. It’s like she’s got some secret husky connection to the night sky.",
            "Water Bowl Splash Party: Instead of just drinking from her bowl, Rusty loves to paw at the water first, splashing some of it out, then taking a dainty sip as if nothing happened.",
            "Socks Only, Please: Rusty is a master thief, but only for socks. She’ll leave shoes alone, but a sock? Fair game for her secret lair."
        ]
    }
    
]

const catData = [
    {
        speciesID: 2,
        species: "Cats",
        id: 3,
        name: "Nimbus",
        age: "2 years",
        img: "https://images.unsplash.com/photo-1643703605778-7bafebc84afd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvcmVzdCUyMGNhdHxlbnwwfHwwfHx8Mg%3D%3D",
        about: "Hello, I’m Nimbus, your charming grey Norwegian Forest cat! I’m a cloud-watching connoisseur who loves to lounge in sunbeams, soaking up every ray. My feather wand is my ultimate nemesis, and you’ll often find me leaping through the air to catch it like the fierce hunter I am. Grocery bags? They’re my personal playground, perfect for adventurous explorations! I’m a vocal little philosopher, sharing my thoughts with an array of chirps and trills, especially when it’s time for dinner or I’m ready for some cuddles. Oh, and if you sit down, be prepared for me to claim your lap as my royal throne. Life is an adventure filled with warmth and curiosity, and I can’t wait to share it with you!",
        intro: "Nimbus is sure to be a charming and whimsical addition to your household!",
        hobbies: [
            "Cloud Watching: Nimbus loves to perch on the highest windowsill, gazing out at the clouds and daydreaming about soaring through the sky.",
            "Sunbeam Chaser: Whenever the sun shines through the window, Nimbus transforms into a sunbather, strategically moving around to follow the rays and catch the warmest spots.",
            "Grocery Bag Explorer: Nimbus has an adventurous spirit and adores jumping into grocery bags as soon as they hit the floor, treating them like a secret cave."
        ],
        faveToys: [
            "Feather Wand: Nimbus can’t resist the allure of the feather wand, expertly pouncing and leaping to catch the fluttering prey.",
            "Ball of Yarn: A classic favorite, Nimbus loves to bat around balls of yarn, often getting tangled up in her own playful chaos.",
            "Interactive Puzzle Toy: This toy keeps Nimbus mentally stimulated as she works to retrieve treats hidden within, combining her love for puzzles with tasty rewards."
        ],
        habits: [
            "Whisker Wiggle: When Nimbus is excited or curious, she wiggles her whiskers in a funny way, as if they're her own personal antennae.",
            "Vocal Melodies: Nimbus loves to talk, and she has a unique range of chirps and trills, especially when she’s demanding attention or expressing her opinions about dinner.",
            "Lap Lounger: Nimbus has an uncanny ability to sense when someone is about to sit down, and she’ll immediately claim the lap as her throne, purring contentedly."
        ]
    }
]



module.exports = {dogData, catData}