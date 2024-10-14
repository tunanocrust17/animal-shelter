const {Client} = require('pg')
const path = require('node:path')
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, '../../.env')})

const CREATE_ANIMALS_TABLE_SQL = 
`CREATE TABLE IF NOT EXISTS Animals (
    animal_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    species VARCHAR ( 255 ),
    age INT,
    age_units VARCHAR (10),
    gender VARCHAR ( 10 ),
    weight DECIMAL ( 5, 2 ),
    weight_unit VARCHAR (3),
    img VARCHAR ( 255 ),
    adopted VARCHAR ( 3 )
)`;

const CREATE_HOBBIES_TABLE_SQL = 
`CREATE TABLE IF NOT EXISTS Hobbies (
    hobby_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    hobby_name VARCHAR ( 50 ),
    hobby_desc VARCHAR ( 500 )
)`;

const CREATE_QUIRKS_TABLE_SQL = 
`CREATE TABLE IF NOT EXISTS Quirks (
    quirks_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    quirk_name VARCHAR ( 50 ),
    quirk_desc VARCHAR ( 500 )
)`;

const CREATE_ANIMALS_HOBBIES_TABLE_SQL =
`CREATE TABLE IF NOT EXISTS Animal_hobbies (
    animal_id INT,
    hobby_id INT,
    FOREIGN KEY (animal_id) REFERENCES Animals(animal_id),
    FOREIGN KEY (hobby_id) REFERENCES Hobbies(hobby_id),
    PRIMARY KEY (animal_id, hobby_id)
)`;

const CREATE_ANIMALS_QUIRKS_TABLE_SQL =
`CREATE TABLE IF NOT EXISTS Animal_quirks (
    animal_id INT,
    quirk_id INT,
    FOREIGN KEY (animal_id) REFERENCES Animals (animal_id),
    FOREIGN KEY (quirk_id) REFERENCES Hobbies (hobby_id),
    PRIMARY KEY (animal_id, quirk_id)
)`;

const INSERT_HOBBIES_SQL =
`INSERT INTO Hobbies (hobby_name, hobby_desc)
    VALUES
    ('Laser Dot Chasing Championships', 'Competing to catch the ever-elusive red dot!'),
    ('Box Sitting', 'Trying to sit in every box, no matter the size. The smaller, the better.'),
    ('Window Bird-Watching Society', 'Sitting by the window, silently judging birds and squirrels.'),
    ('Blanket Fort Construction', 'Knocking over blankets and pillows to create the perfect cozy hideout.'),
    ('Sock Collecting', 'Stealing socks and hiding them in secret stashes around the house.'),
    ('Invisible Ghost Hunting', 'Darting around at nothing, randomly chasing invisible foes.'),
    ('Paper Shredding Enthusiasts', 'Shredding toilet paper, wrapping paper, or important documents with pride.'),
    ('Staircase Racing League', 'Zooming up and down the stairs at lightning speed for no apparent reason.'),
    ('Tightrope Walking', 'Strutting along the top of furniture, shelves, or any narrow ledge.'),
    ('Bathtub Inspector', 'Sitting in the tub (while it''s empty!) for no real reason other than because I can.'),
    ('Car Window Enthusiast Club', 'Sticking their head out of car windows for the ultimate breeze experience.'),
    ('Tail-Chasing Championships', 'The art of running in endless circles to catch that elusive tail.'),
    ('Vacuum Barking Society', 'Barking at the vacuum cleaner as if it''s a sworn enemy.'),
    ('Sock Chewing League', 'Enjoying the texture of socks while being oblivious to their owner''s dismay.'),
    ('Squeaky Toy Orchestra', 'Playing squeaky toys like instruments with a focus on loud, repetitive “music.”'),
    ('Puddle Jumping Society', 'Enthusiastically splashing in any puddle, even the tiniest one.'),
    ('Mailman Watch', 'A daily surveillance operation to bark at the mailman precisely at 2:15 pm.'),
    ('Stick Collecting', 'Gathering a collection of sticks from every walk, regardless of their size or weight.'),
    ('Zoomies Marathon', 'Participating in random bursts of running around the house or yard like they''re in a race.'),
    ('Door Greeter Extraordinaire', 'Acting as the household''s official greeter, no guest or delivery person goes unnoticed!')
`;

const INSERT_QUIRKS_SQL = 
`INSERT INTO Quirks (quirk_name, quirk_desc)
    VALUES
    ('Snack Stealth', 'Sneaking into the kitchen when no one is looking to expertly nudge treats off the counter. It''s all about the thrill of the chase.'),
    ('The Slow Blink of Approval', 'Giving their human slow, deliberate blinks as a sign of trust and affection.'),
    ('Kneading Bread', 'Pushing their paws into soft surfaces (or your stomach) like they''re making dough for bread.'),
    ('Tail Flick of Judgment', 'Flicking their tail just enough to show they''re displeased, usually for no clear reason.'),
    ('Sudden ''I Must Run'' Urges', 'Randomly sprinting from one room to another with no provocation whatsoever.'),
    ('Sleeping in the Weirdest Places', 'Choosing to sleep in the oddest and most uncomfortable-looking spots, like the sink or a bookshelf.'),
    ('Loves Drinking from the Wrong Place ', 'Ignoring their water bowl in favor of drinking from a leaky faucet, plant pot, or even your glass of water.'),
    ('Head-Butting for Attention', 'Gently head-butting their human to get affection or say hello.'),
    ('Watching You from the Darkness', 'Sitting in a dimly lit room or hallway and silently staring at you like a fluffy spy.'),
    ('Pretending Not to Hear You', 'Mastering the art of selective hearing, especially when their name is called.'),
    ('Flopping Dramatically', 'Flopping over on their side with great drama when they want attention or belly rubs.'),
    ('Head Tilt of Curiosity', 'Tilting their head dramatically to one side when they hear something interesting, like a funny noise or a question.'),
    ('Excessive Sniffing',  'Investigating absolutely everything by sniffing it for way longer than seems necessary.'),
    ('The Full-Body Wag', 'When their excitement is so overwhelming, their entire body wiggles along with their tail.'),
    ('Invisibility Cloak (Under the Table)', 'Hiding under the table during storms, fireworks, or awkward social situations, convinced they''re invisible.'),
    ('Selective Fetch Enthusiasm', 'Bringing back the ball once or twice with excitement, then completely losing interest on the third throw.'),
    ('Happy Peeing', 'Excitedly peeing a little when they meet someone they love or get overly excited.'),
    ('Belly-Up Demand for Rubs', 'Flipping onto their back with their legs in the air, demanding belly rubs in the cutest way possible.'),
    ('Nose Nudges for Attention', 'Nudging your hand with their nose when they want you to pet them or are feeling left out.'),
    ('Talking with Growls and Whines', 'Using soft growls, whines, and other noises to talk to their humans, as if they''re having a conversation.'),
    ('Running in Dreams', 'When they''re asleep, legs twitching like they''re running a marathon in a dream filled with squirrels or rabbits.')
`;


async function main() {
    console.log('seeding...')
    const client = new Client({
        connectionString: process.env.CONNECTIONSTRING
    })

    await client.connect()

    try {
        await client.query('BEGIN')
        await client.query(CREATE_ANIMALS_TABLE_SQL)
        await client.query(CREATE_HOBBIES_TABLE_SQL)
        await client.query(CREATE_QUIRKS_TABLE_SQL)
        await client.query(CREATE_ANIMALS_HOBBIES_TABLE_SQL)
        await client.query(CREATE_ANIMALS_QUIRKS_TABLE_SQL)
        await client.query(INSERT_HOBBIES_SQL)
        await client.query(INSERT_QUIRKS_SQL)
        await client.query('COMMIT')
    } catch(err) {
        await client.query('ROLLBACK')
        console.log('Transaction failed, rolling back: ', err)
    } finally {
        await client.end()
        console.log('done')
    }
}

main()