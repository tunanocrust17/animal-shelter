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

    static async updateAnimal(animal_id, name, species, age, age_units, gender, weight, weight_unit, img, adopted, hobbies, quirks){
        const client = await pool.connect()

        try {
            await pool.query('BEGIN')

            console.log(typeof(animal_id))

            //Update the animal basic info
            const animalQuery = `UPDATE Animals SET name = $1, 
                                    species = $2, 
                                    age = $3, 
                                    age_units = $4, 
                                    gender = $5, 
                                    weight = $6, 
                                    weight_unit = $7, 
                                    img = $8, 
                                    adopted = $9
                                    WHERE animal_id = $10`
            const animalValues = [name, species, age, age_units, gender, weight, weight_unit, img, adopted, animal_id]
            await client.query(animalQuery, animalValues)


            //get all the hobbies the animal currently has
            const currentHobbies = await client.query(
                'SELECT hobby_id FROM Animal_Hobbies WHERE animal_id = $1'
            , [animal_id]);
    
            const currentHobbyIds = currentHobbies.rows.map(row => row.hobby_id);
            
            // Determine which hobbies to insert and which to delete
            const hobbiesToAdd = hobbies.filter(hobby => !currentHobbyIds.includes(hobby));
            const hobbiesToRemove = currentHobbyIds.filter(hobbyId => !hobbies.includes(hobbyId));
    
            // Insert new hobbies
            if (hobbiesToAdd.length > 0) {
                const insertHobbiesQuery = `INSERT INTO Animal_Hobbies (animal_id, hobby_id) VALUES ${hobbiesToAdd.map((_, i) => `($1, $${i + 2})`).join(', ')} ON CONFLICT (animal_id, hobby_id) DO NOTHING`;
                await client.query(insertHobbiesQuery, [animal_id, ...hobbiesToAdd]);
            }

            //Delete hobbies that are no longer selected
            if (hobbiesToRemove.length  > 0) {
                const deleteHobbiesQuery = `DELETE FROM Animal_Hobbies WHERE animal_id = $1 AND hobby_id = ANY($2)`;
                await client.query(deleteHobbiesQuery, [animal_id, hobbiesToRemove])
            }


            // Fetch current quirks for the animal
            const currentQuirks = await client.query(`
                SELECT quirk_id FROM Animal_Quirks WHERE animal_id = $1;
            `, [animal_id]);

            const currentQuirkIds = currentQuirks.rows.map(row => row.quirk_id);

            // Determine which quirks to insert and which to delete
            const quirksToAdd = quirks.filter(quirk => !currentQuirkIds.includes(quirk));
            const quirksToRemove = currentQuirkIds.filter(quirkId => !quirks.includes(quirkId));

            // Insert new quirks
            if (quirksToAdd.length > 0) {
                const insertQuirksQuery = `
                    INSERT INTO Animal_Quirks (animal_id, quirk_id)
                    VALUES ${quirksToAdd.map((_, i) => `($1, $${i + 2})`).join(', ')}
                    ON CONFLICT (animal_id, quirk_id) DO NOTHING;
                `;
                await client.query(insertQuirksQuery, [animal_id, ...quirksToAdd]);
            }

            // Remove quirks that were deselected
            if (quirksToRemove.length > 0) {
                const deleteQuirksQuery = `
                    DELETE FROM Animal_Quirks WHERE animal_id = $1 AND quirk_id = ANY($2);
                `;
                await client.query(deleteQuirksQuery, [animal_id, quirksToRemove]);
            }

            await client.query('COMMIT') //commit the transaction
            
        } catch (err) {
            await client.query('ROLLBACK')
            console.error('Error updating animals: ', err)
            throw err
        } finally {
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