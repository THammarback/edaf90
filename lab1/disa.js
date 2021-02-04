//'use strict';
//const imported = require("./inventory.js");

window.onload = function(){
	console.log(inventory)
	//let inventory = imported.inventory;

	const allInventory = Object.keys(inventory);
	const allFoundation = allInventory.filter(word => inventory[word].foundation === true);
	const allExtras = allInventory.filter(word => inventory[word].extra === true);
	const allDressing = allInventory.filter(word => inventory[word].dressing === true);
	const allProtein = allInventory.filter(word => inventory[word].protein === true);

	// console.log("Foundations: " +allFoundation);
	// console.log("Proteins: " +allProtein);
	// console.log("Dressing: " +allDressing);
	// console.log("Extra: " +allExtras)
	
	let myCeasarSalad = new Salad('Sallad', 'Kycklingfilé', 'Avocado', 'Ceasardressing');
	console.log("myCeasarSalad",myCeasarSalad);
	myCeasarSalad.add('Pasta');
	myCeasarSalad.remove('Avocado');
	console.log("myCeasarSalad.price()", myCeasarSalad.price());
	let myGreenSalad = new ExtraGreenSalad("Sallad + Pasta", "Marinerad bönmix", "Böngroddar", "Fetaost", "Sojabönor", "Dillmayo");
	console.log("myGreenSalad.price()", myGreenSalad.price());
	let myGourmetSalad = new GourmetSalad(["Sallad + Glasnudlar","Pulled beef från Sverige", "Parmesan","Oliver","Inlagd lök","Örtvinägrett"], [1.2, 1.5, 0.7, 2, 1, 0.5]);
	console.log("myGourmetSalad", myGourmetSalad);
	console.log("myGourmetSalad.price()", myGourmetSalad.price());
	myGourmetSalad.add("Sallad", 1);
	console.log("myGourmetSalad", myGourmetSalad);

	let myShoppingBasket = new shoppingBasket();
	myShoppingBasket.add(myGourmetSalad);
	myShoppingBasket.add(myGreenSalad);
	myShoppingBasket.add(myCeasarSalad);
	console.log("myShoppingBasket", myShoppingBasket)
	console.log("myShoppingBasket.price()", myShoppingBasket.totalPrice());
	myShoppingBasket.remove(myGourmetSalad);
	console.log(myShoppingBasket)
	console.log("myShoppingBasket.price()", myShoppingBasket.totalPrice());
}

class Salad{
	constructor(...components){
		this.extras = [];
		components.forEach(ingredientName => {
			this.add(ingredientName)
		})
	}

	price(){
		let components = [this.foundation, this.protein, ...this.extras, this.dressing];
		return components.reduce((sum, component) =>{
			return sum + parseInt(inventory[component].price);
		},0);
	}
	
	add(ingredientName){
		let ingredientProperties = inventory[ingredientName];
		if(ingredientProperties){
			if(ingredientProperties.foundation){
				this.foundation = ingredientName;
			}else if(ingredientProperties.protein){
				this.protein = ingredientName;
			}else if(ingredientProperties.extra){
				this.extras.push(ingredientName)
			}else if(ingredientProperties.dressing){
				this.dressing = ingredientName;
			}else{
				console.error("Error adding ingredient:\nName: "+ingredientName+"\nProperties:", ingredientProperties);
				return false;
			}
			return true;
		}else{
			console.error("Error adding ingredient:\nName not listed in ingredients: "+ingredientName);
		}
	}
	remove(ingredientName){
		if(this.foundation === ingredientName){
			this.foundation = undefined;
			return ingredientName
		}
		if(this.protein === ingredientName){
			this.protein = undefined;
			return ingredientName
		}
		if(this.dressing === ingredientName){
			this.dressing = undefined;
			return ingredientName
		}
		var index = this.extras.indexOf(ingredientName);
		if (index !== -1){
			this.extras.splice(index, 1);
			return ingredientName
		}
		console.error("Error removeing ingredient, not found in salad:\nName: "+ingredientName);
		return false
	}	
}

class GourmetSalad extends Salad{
	constructor(components, sizes){
		super();
		this.foundationSize = 0;
		this.proteinSize = 0;
		this.dressingSize = 0;
		this.extraSizes = [];
		components.forEach((component, index)=>{
			if(typeof sizes[index] === "number")
				this.add(component, sizes[index])
			else
				console.error("Index-fel")
		});
	}
	
	price(){
		let components = [this.foundation, this.protein, ...this.extras, this.dressing];
		let sizes = [this.foundationSize, this.proteinSize, ...this.extraSizes, this.dressingSize];
		return components.reduce((sum, component, index) =>{
			return sum + parseInt(inventory[component].price)*sizes[index];
		},0);
	}
	
	add(ingredientName, size){
		let ingredientProperties = inventory[ingredientName];
		if(ingredientProperties){
			if(ingredientProperties.foundation){
				this.foundation = ingredientName;
				this.foundationSize = size || 1;
			}else if(ingredientProperties.protein){
				this.protein = ingredientName;
				this.proteinSize = size || 1;
			}else if(ingredientProperties.extra){
				this.extras.push(ingredientName)
				this.extraSizes.push(size || 1)
			}else if(ingredientProperties.dressing){
				this.dressing = ingredientName;
				this.dressingSize = size || 1;

			}else{
				console.error("Error adding ingredient:\nName: "+ingredientName+"\nProperties:", ingredientProperties);
				return false;
			}
			return true;
		}else
			console.error("Error adding ingredient:\nName not listed in ingredients: "+ingredientName);
	}
	
	remove(ingredientName){
		if(this.foundation === ingredientName){
			this.foundation = undefined;
			this.foundationSize = 0;
			return ingredientName
		}
		if(this.protein === ingredientName){
			this.protein = undefined;
			this.proteinSize = 0;
			return ingredientName
		}
		if(this.dressing === ingredientName){
			this.dressing = undefined;
			this.dressingSize = 0;
			return ingredientName
		}
		
		var index = this.extras.indexOf(ingredientName);
		if (index !== -1){
			this.extras.splice(index, 1);
			this.extraSizes.splice(index, 1);
			return ingredientName
		}
		console.error("Error removeing ingredient, not found in salad:\nName: "+ingredientName);
		return false
	}
}

class ExtraGreenSalad extends Salad{
	constructor(...components){
		super(...components)
	}
	
	price(){
		let components = [this.protein, ...this.extras, this.dressing];
		let totalcomp = components.reduce((sum, component) =>{
			return sum + parseInt(inventory[component].price)*0.5;
		},0);
		return totalcomp + parseInt(inventory[this.foundation].price)*1.3;
	}
}

class shoppingBasket {
	constructor(){
		this.sallads = [];
	}

	add(salad){
		this.sallads.push(salad);
		return true;
	}

	remove(salad){
		const index = this.sallads.indexOf(salad);
		if (index !== -1){
			this.sallads.splice(index, 1);
			return true;
		}else{
			console.log("Salladen är inte inlagd");
		}
	}

	totalPrice(){
		let total = this.sallads.reduce((sum, component) =>{
			return sum + (component.price());
		},0);
		return total;
	}
}

