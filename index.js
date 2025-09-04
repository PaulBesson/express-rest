import express from 'express';
import 'dotenv/config';
import auth from 'basic-auth';
import personne from './routes/personne.route.js';
import adresse from './routes/adresse.route.js';

const admin = { username: "admin", password: "admin"}; // admin simulé (check db en vrai)

// configurer yup

const app = express();

// Configuration de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
})
const basicAuth = (req, res, next) => {
	// const userBase64 = req.headers['authorization'];
	const unknownUser = auth(req);
	const {name, pass} = unknownUser;
	if (name != admin.username || pass != admin.password) {
		return res.sendStatus(401);
	}
	// console.log(userBase64);
	// console.log(unknownUser);
	
	next();
}

// app.use(basicAuth);

// utiliser le middleware body-parser
app.use(express.json());

// configurer les ressources statiques
// app.use(express.static('public'))


// Mapping entre routes et le routeur
app.use("/personnes", basicAuth, personne);
app.use("/adresses", adresse);









const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
});