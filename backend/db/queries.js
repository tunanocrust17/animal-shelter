const db = require('../data/animalData');
const pool = require('./pool');

class FormData {
    static async getHobbies(){
        const query = 'SELECT * FROM Hobbies'
        try{
            const res = await pool.query(query)
            return res.rows
        } catch(err){
            console.error('Error fetching hobby options: ', err)
            throw err;
        }
    }

    static async getQuirks(){
        const query = 'SELECT * FROM Quirks'
        try{
            const res = await pool.query(query)
            return res.rows
        } catch(err){
            console.error('Error fetching quirk options: ', err)
            throw err;
        }
    }
}

class AnimalClass {
    static async createAnimal(name, species, age, age_units, gender, weight, weight_unit, img, adopted, hobbies, quirks){
        const client = await pool.connect();

        try {
            await pool.query('BEGIN') //starts the transaction
        
            // 1. Insert the animal and 
            const animalQuery = 'INSERT INTO Animals (name, species, age, age_units, gender, weight, weight_unit, img, adopted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING animal_id'
            const animalValues = [name, species, age, age_units, gender, weight, weight_unit, img, adopted]
            const animalResult = await client.query(animalQuery, animalValues)
            const animalID = animalResult.rows[0].animal_id

            // 2. Insert multiple hobbies at once for the same animal
            if (hobbies && hobbies.length > 0) {
                const insertHobbyQuery = `INSERT INTO Animal_hobbies (animal_id, hobby_id) VALUES ${hobbies.map((_, i) => `($1, $${i + 2})`).join(', ')}`;
                const hobbyValues = [animalID, ...hobbies]
                await client.query(insertHobbyQuery, hobbyValues)
            }

            // 3. Insert multiple quirks at once for the same animal
            if (quirks && quirks.length > 0) {
                const insertQuirkQuery = `INSERT INTO Animal_quirks (animal_id, quirk_id) VALUES ${quirks.map((_, i) => `($1, $${i + 2})`).join(', ')}`;
                const quirkValues = [animalID, ...quirks]
                await client.query(insertQuirkQuery, quirkValues)
            }

            await client.query('COMMIT') //commit the transaction
            
        } catch(err){
            await client.query('ROLLBACK')
            console.error('Error creating animal:', err);
            throw err;
        } finally{
            client.release()
        }
    }

    static async getAllAnimals(){
        const query = 'SELECT * FROM Animals'
        try {
            const res = await pool.query(query)
            return res.rows
        } catch(err) {
            console.error('Error fetching all animals: ', err);
            throw err;
        }
    }

    static async getAllAnimalsSorted(){
        const query = 'SELECT * FROM Animals ORDER BY name ASC'
        try {
            const res = await pool.query(query)
            return res.rows
        } catch(err) {
            console.error('Error fetching animals ordered by name: ', err)
            throw err
        }
    }

    static async getBySpecies(species) {
        const query = 'SELECT * FROM Animals WHERE species = $1'
        const value = [species]
        try {
            const res = await pool.query(query, value)
            return res.rows
        } catch(err) {
            console.error('Error fetching species: ', err);
            throw err
        }
    }

    static async getAnimalByID(id){
        const query = 'SELECT * FROM Animals WHERE animal_id = $1'
        const value = [id]
        try {
            const res = await pool.query(query, value)
            return res.rows[0]
        } catch(err) {
            console.error('Error fetching animal: ', err);
            throw err;
        }
    }

    static async getAnimalHobbies(id){
        const query = 'SELECT h.hobby_name, h.hobby_id FROM Animal_hobbies ah JOIN Hobbies h ON h.hobby_id = ah.hobby_id WHERE ah.animal_id = $1'
        const value = [id]
        try {
            const res = await pool.query(query, value)
            return res.rows
        } catch(err) {
            console.error('Error fetching hobbies: ', err)
            throw err
        }
    }

    static async getAnimalQuirks(id){
        const query = 'SELECT q.quirk_name, q.quirk_id FROM Animal_quirks aq JOIN Quirks q ON q.quirk_id = aq.quirk_id WHERE aq.animal_id = $1'
        const value = [id]
        try {
            const res = await pool.query(query, value)
            return res.rows
        } catch(err) {
            console.error('Error fetching hobbies: ', err)
            throw err
        }
    }
}

module.exports = {
    FormData,
    AnimalClass
}