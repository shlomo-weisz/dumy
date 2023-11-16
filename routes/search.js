const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.send('Search page');
	
	
}
);


router.get('/:id', (req, res) => {
	console.log('searching');
	let result = '000';
	let id = req.params.id;
	console.log(id);
	fetch('https://dummyjson.com/products/'+id)
	.then(res => res.json())
	.then((data) => {
		console.log(data);
	result = data;
	res.send(result)	
	});
	
	
}
);
module.exports = router;