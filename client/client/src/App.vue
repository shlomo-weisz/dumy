<template>
	<div class="container">
		<div id="top">
			<div id="searches">
				<label for="searchline">search by id. please enter a number</label>
				<input type="text" id="searchline" v-model="searchID">

				<button @click="search">search</button>
				<button v-show="showSearch" @click="showSearch = false">show all</button>
			</div>
			<div id="add">
				<label for="addline">add a product</label>

				<button @click="addform = true">add</button>
			</div>
			<form>
				<div v-show="addform">
					<label for="title">title</label>
					<input type="text" id="title" v-model="title">
					<label for="description">description</label>
					<input type="text" id="description" v-model="description">
					<label for="price">price</label>
					<input type="text" id="price" v-model="price">
					<label for="discountPercentage">discountPercentage</label>
					<input type="text" id="discountPercentage" v-model="discountPercentage">
					<label for="rating">rating</label>
					<input type="text" id="rating" v-model="rating">
					<label for="stock">stock</label>
					<input type="text" id="stock" v-model="stock">
					<label for="brand">brand</label>
					<input type="text" id="brand" v-model="brand">
					<label for="category">category</label>
					<input type="text" id="category" v-model="category">
					<label for="thumbnail">thumbnail</label>
					<input type="text" id="thumbnail" v-model="thumbnail">
					<label for="image">image</label>
					<input type="text" id="image" v-model="image">

					<button @click.prevent="add">add</button>
				</div>
			</form>

		</div>
		<table>
			<thead>
				<th>ID</th>
				<th>Title</th>
				<th>Description</th>
				<th>Price</th>
				<th>discountPercentage</th>
				<th>rating</th>
				<th>stock</th>
				<th>brand</th>
				<th>category</th>
				<th>thumbnail</th>
				<th>image</th>
			</thead>
			<tbody>
				<tr v-if="showSearch">
					<td>{{ searchResult.id }}</td>
					<td>{{ searchResult.title }}</td>
					<td>{{ searchResult.description }}</td>
					<td>{{ searchResult.price }}</td>
					<td>{{ searchResult.discountPercentage }}</td>
					<td>{{ searchResult.rating }}</td>
					<td>{{ searchResult.stock }}</td>
					<td>{{ searchResult.brand }}</td>
					<td>{{ searchResult.category }}</td>
					<td>{{ searchResult.thumbnail }}</td>
					<td><img :src="searchResult.images[0]" alt=""></td>
				</tr>
				<tr v-show="!showSearch" v-for="product in products" :key="product.id">
					<td>{{ product.id }}</td>
					<td>{{ product.title }}</td>
					<td>{{ product.description }}</td>
					<td>{{ product.price }}</td>
					<td>{{ product.discountPercentage }}</td>
					<td>{{ product.rating }}</td>
					<td>{{ product.stock }}</td>
					<td>{{ product.brand }}</td>
					<td>{{ product.category }}</td>
					<td>{{ product.thumbnail }}</td>
					<td><img :src="product.images[0]" alt=""></td>
				</tr>
			</tbody>
		</table>
		<!-- <div id="app">
		<div class="container">
			<div class="row">
				<div v-for="product1 in products" :key="product1.id">
					<Product :product="product1" />
				</div>
			</div>
		</div>
	</div> -->
	</div>
</template>
<script>
import Product from './components/Product.vue'
export default {
	name: 'App',
	components: {
		Product
	},
	data() {
		return {
			products: [],
			searchID: '1',
			showSearch: false,
			searchResult: '',
			addform: false,
			title: '',
			description: '',
			price: '',
			discountPercentage: '',
			rating: '',
			stock: '',
			brand: '',
			category: '',
			thumbnail: '',
			image: ['https://i.dummyjson.com/data/products/2/1.jpg'],
			answer: ''
		}
	},
	methods: {
		search() {
			let result;
			fetch('http://localhost:3000/' + this.searchID)
				.then(res => res.json())
				.then((data) => {
					console.log(data);
					result = data
					this.searchResult = result
					if (Object.keys(data).length === 1) {
						alert(data.message)
						return
					}
					this.showSearch = true
				})

		},
		add() {
			console.log('add');
			if (this.title === '' & this.description === '' & this.price === '' & this.discountPercentage === '' & this.rating === '' & this.stock === '' & this.brand === '' & this.category === '' & this.thumbnail === '' & this.image === '') {
				alert('please fill the fields')
				return
			}
			let result = {};
			result.title = this.title;
			result.description = this.description;
			result.price = this.price;
			result.discountPercentage = this.discountPercentage;
			result.rating = this.rating;
			result.stock = this.stock;
			result.brand = this.brand;
			result.category = this.category;
			result.thumbnail = this.thumbnail;
			result.images = this.image;
			console.log(result);
			fetch('http://localhost:3000/', {
				method: 'POST',
				body: JSON.stringify(result),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json())
				.then((data) => {
					// data.images = this.images
					console.log(data);
					
					this.products.push(data)
					alert('product added to end of the list')
					this.addform = false
				})

		},
		demoadd()
		{
			let result = '';
			fetch('http://localhost:3000/demoadd', {
				method: 'POST'
				
			})
				.then(res => res.json())
				.then((data) => {
					console.log(data);					
					this.answer = data;
					alert(data.massage);
					
				})
		}

	},
	mounted() {
		let result;
		fetch('http://localhost:3000/')
			.then(res => res.json())
			.then((data) => {
				console.log(data);
				result = data.products
				this.products = result
				console.log(this.products[0]);
			})

	}
}


</script>


<style >
.container {
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
}

#searches,
#add {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border: 4px solid black;
	padding: 10px;

}

table {
	border-collapse: collapse;
	width: 100%;
	border: 1px solid #ddd;
}

th,
td {
	text-align: left;
	padding: 8px;
	border: 1px solid #ddd;
}

button {
	margin-left: 10px;
	color: white;
	background-color: black;
	border: 1px solid black;
	padding: 5px;
}

tr:nth-child(even) {
	background-color: #f2f2f2;
}

th {
	background-color: #4CAF50;
	color: white;
}

img {
	width: 100px;
	height: 100px;
}</style>
