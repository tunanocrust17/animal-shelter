const db = require('../data/animalData');
const pool = require('./pool');

class FormData {
    async getHobbies(){
        const query = 'SELECT hobby_name FROM Hobbies'
        try{
            const res = await pool.query(query)
            return res.rows
        } catch(err){
            console.error('Error fetching hobby options: ', err)
            throw err;
        }
    }
}

class AnimalClass {
    static async createAnimal(name, species, age, gender, weight, img){
        const query = 'INSERT INTO Animals (name, species, age, gender, weight, img) VALUES ($1, $2, $3, $4, $5, $6)'
        const values = [name, species, age, gender, weight, img]
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