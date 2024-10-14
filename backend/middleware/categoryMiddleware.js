const pool = require('../db/pool')

//Middleware to fetch categories from database
async function fetchCategories(req, res, next) {
    try {
        const result = await pool.query('SELECT DISTINCT species FROM animals');
        const species = result.rows.map(row => row.species)

        // Attach categories to res.locals to make them accessible in views
        res.locals.animalSpecies = species
        next();
    } catch(err) {
        console.error('Error fetching animal species: ', err);
        next(err)
    }
}
module.exports = fetchCategories;