import inventory from './inventory.ES6';

class Salad{
	constructor(...components){
		this.extras = [];
		this.proteins = [];
		components.forEach(ingredientName => {
			this.add(ingredientName)
		})
	}

	price(){
		let components = [this.foundation, ...this.proteins, ...this.extras, this.dressing].filter(x=>x);
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
				this.proteins.push(ingredientName)
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
			return ingredientName;
		}
		if(this.dressing === ingredientName){
			this.dressing = undefined;
			return ingredientName;
		}
		if(inventory[ingredientName].protein){
			let index = this.proteins.indexOf(ingredientName);
			if(index !== -1){
				this.proteins.splice(index, 1);
				return ingredientName;
			}
		}
		if(inventory[ingredientName].extra){
			let index = this.extras.indexOf(ingredientName);
			if(index !== -1){
				this.extras.splice(index, 1);
				return ingredientName;
			}	
		}
		console.error("Error removeing ingredient, not found in salad:\nName: "+ingredientName);
		return false
	}	
}

class GourmetSalad extends Salad{
	constructor(components, sizes){
		super();
		this.foundationSize = 0;
		this.proteinSizes = [];
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
		let components = [this.foundation, ...this.proteins, ...this.extras, this.dressing];
		let sizes = [this.foundationSize, ...this.proteinSizes, ...this.extraSizes, this.dressingSize];
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
				this.proteins.push(ingredientName)
				this.proteinSizes.push(size || 1)
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
			this.foundationSize = undefined;
			return ingredientName;
		}
		if(this.dressing === ingredientName){
			this.dressing = undefined;
			this.dressingSize = undefined;
			return ingredientName;
		}
		if(inventory[ingredientName].protein){
			let index = this.proteins.indexOf(ingredientName);
			if(index !== -1){
				this.proteins.splice(index, 1);
				this.proteinSizes.splice(index, 1);
				return ingredientName;
			}
		}
		if(inventory[ingredientName].extra){
			let index = this.extras.indexOf(ingredientName);
			if(index !== -1){
				this.extras.splice(index, 1);
				this.extraSizes.splice(index, 1);
				return ingredientName;
			}	
		}
		console.error("Error removeing ingredient, not found in salad:\nName: "+ingredientName);
		return false
	}	
}

class ExtraGreenSalad extends Salad{
	price(){
		let components = [this.protein, ...this.extras, this.dressing];
		let totalcomp = components.reduce((sum, component) =>{
			return sum + parseInt(inventory[component].price)*0.5;
		},0);
		return totalcomp + parseInt(inventory[this.foundation].price)*1.3;
	}
}

export {Salad, GourmetSalad, ExtraGreenSalad}