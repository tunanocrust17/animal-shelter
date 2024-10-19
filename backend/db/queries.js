const db = require('../data/animalData');
const pool = require('./pool');

class FormData {
    static async getHobbies(){
        const query = 'SELECT hobby_name FROM Hobbies'
        try{
            const res = await pool.query(query)
            return res.rows
        } catch(err){
            console.error('Error fetching hobby options: ', err)
            throw err;
        }
    }

    static async getQuirks(){
        const query = 'SELECT quirk_name FROM Quirks'
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
    static async createAnimal(name, species, age, age_units, gender, weight, weight_unit, img, adopted){
        const query = 'INSERT INTO Animals (name, species, age, age_units, gender, weight, weight_unit, img, adopted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        const values = [name, species, age, age_units, gender, weight, weight_unit, img, adopted]
        try {
            await pool.query(query, values)
        } catch(err){
            console.error('Error creating animal:', err);
            throw err;
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
}

module.exports = {
    FormData,
    AnimalClass
}