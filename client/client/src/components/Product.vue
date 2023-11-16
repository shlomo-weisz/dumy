<template>
	<div>
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
				<tr v-for="product in products" :key="product.id">
					<td>{{product.id}}</td>
					<td>{{product.title}}</td>
					<td>{{product.description}}</td>
					<td>{{product.price}}</td>
					<td>{{product.discountPercentage}}</td>
					<td>{{product.rating}}</td>
					<td>{{product.stock}}</td>
					<td>{{product.brand}}</td>
					<td>{{product.category}}</td>
					<td>{{product.thumbnail}}</td>
					<td>{{product.image}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	name: 'Array',
	props: {
		products: Object
	},
	data() {
		return {

		}
	},
	methods: {

	},
	created() {

	}
}
</script>
<style ></style>