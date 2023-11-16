const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const cors = require('cors');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	let result = '000';
	fetch('https://dummyjson.com/products')
		.then(res => res.json())
		.then((data) => {
			result = data;
			res.send(result)
		});


}
);

app.get('/:id', (req, res) => {
	let result = '000';
	let id = req.params.id;
	fetch('https://dummyjson.com/products/' + id)
		.then(res => res.json())
		.then((data) => {
			result = data;
			res.send(result)
		});
});


app.post('/', (req, res) => {
	let item = req.body;
	let result = '000';
	fetch('https://dummyjson.com/products/add', {
		method: 'POST',
		body: JSON.stringify(item),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
		.then((data) => {
			console.log(data);
			res.send(data);
		}
		);
});


app.post('/demoadd', (req, res) => {
	let result = {"massage": "added item"};
	res.send(result);
}
);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});