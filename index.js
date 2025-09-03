import express from 'express'
import 'dotenv/config'

import personne from './routes/personne.route.js'
import adresse from './routes/adresse.route.js'

// configurer yup

const app = express()

// utiliser le middleware body-parser
app.use(express.json())

// configurer les ressources statiques
// app.use(express.static('public'))


// Mapping entre routes et le routeur
app.use("/personnes", personne)
app.use("/adresses", adresse)









const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
})