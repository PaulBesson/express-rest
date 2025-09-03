import connection from '../config/db.config.js';


const findAll = async () => {
	const SELECT = "SELECT * FROM personnes"
	try {
		const resultat = await connection.query(SELECT)
		return resultat[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

const save = async (personne) => {
	const INSERT = "INSERT INTO personnes values (null, ?, ?, ?)"
	try {
		const resultat = await connection.query(INSERT, [personne.nom, personne.prenom, personne.age])
		personne.id = resultat[0].insertId
		return personne
	} catch (error) {
		console.log(error);
		return null
	}
}

const deleteById = async (id) => {
	const DELETE = "DELETE FROM personnes WHERE id=?"
	try {
		await connection.query(DELETE, id);
	} catch (error) {
		console.log(error);
	}
}

const findById = async (id) => {
	const SELECT = "SELECT * FROM personnes WHERE id=?";
	try {
		const resultat = await connection.query(SELECT, id);
		return resultat[0][0];
	}
	catch (error) {
		console.log(error);
		return null;
	}
}

const update = async (personne) => {
	const UPDATE = "UPDATE personnes SET nom=?, prenom=?, age=? WHERE id=?";
	try {
		const resultat = await connection.query(UPDATE, [personne.nom, personne.prenom, personne.age, personne.id]);
		if (resultat[0].affectedRows > 0) {
			return personne
		}
	}
	catch (error) {
		console.log(error);
	}
	return null;
}

export default { findAll, save, deleteById, findById, update }