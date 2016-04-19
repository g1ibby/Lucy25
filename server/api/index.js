import { Router } from 'express';
import clean from './clean';

export default function() {
	var api = Router();

	// mount the facets resource
	api.use('/clean', clean);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	return api;
}
