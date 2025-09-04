import yup from '../config/yup.config.js'
import personneRepository from '../repositories/personne.repository.js';

// yup.setLocale(fr);


const personneSchema = yup.object().shape({
	nom: yup
		.string()
		.required()
		.matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 4 et 20 characteres"),
	prenom: yup
		.string()
		.min(3, (args) => `Le prenom doit contenir au moins ${args.min} characteres, valeur saisie : ${args.value}`)
		.max(20),
	age: yup
		.number()
		.required()
		.positive()

})

const showAll = async (req, res, next) => {
	const personnes = await personneRepository.findAll()
	return res
		.status(200)
		.json(personnes)
}

const showOne = async (req, res, next) => {
	const id = req.params.id
	const personne = await personneRepository.findById(id)
	if (personne) {
		return res
			.status(200)
			.json(personne)
	}
	return res
		.sendStatus(404);
}

const add = (req, res, next) => {

	personneSchema
		.validate(req.body, { abortEarly: false })
		.then(async () => {
			const p = await personneRepository.save(req.body)
			if (p) {
				return res
					.status(201)
					.json(p)
			}
		})
		.catch(err => {
			console.log(err);
			return res
				.sendStatus(500)
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id;
	const personne = personneRepository.findById(id);
	if (personne) {
		await personneRepository.deleteById(id);
		return res
			.sendStatus(204);
	} else {
		return res
			.sendStatus(404);
	}
}

const update = async (req, res, next) => {
	if (req.params.id != req.body.id) {
		return res.sendStatus(400)
	}
	if (!await personneRepository.findById(req.params.id)) {
		return res.sendStatus(404)
	}
	personneSchema
		.validate(req.body, { abortEarly: false })
		.then(async () => {
			await personneRepository.update(req.body)
			return res
				.status(202)
				.json(req.body)
		})
		.catch(err => {
			console.log(err);
			return res
				.sendStatus(500)
		})
}

export default { showAll, showOne, add, remove, update };