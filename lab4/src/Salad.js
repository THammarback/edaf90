import inventory from "./inventory.ES6";

class Salad{
	constructor(...components){
		this.extras = [];
    this.protein = [];
    this.cost = 0;
		this.id = 0;
		components.forEach(ingredientName => {
			this.add(ingredientName)
		})
  }

	price(){
		let components = [this.foundation, ...this.protein, ...this.extras, this.dressing];
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
				this.protein.push(ingredientName);
    }else if(ingredientProperties.extra){
				this.extras.push(ingredientName)
    	}	else if(ingredientProperties.dressing){
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
	removeAll(){
      this.proteins = [];
      this.extras =[];
      this.dressing= '';
      this.cost = 0;
			return true;
	}	
}

export default Salad;