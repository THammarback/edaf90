import React, { Component } from 'react';
import Salad from "./Salad"


class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation:props.selectedSalad?.foundation || '',
      dressing:props.selectedSalad?.dressing || '',
      proteins:props.selectedSalad?.proteins || [],
      extras:props.selectedSalad?.extras || []
    }
  }

  selectionChange = (event, type) => {
    if (type === 'foundation') {
      this.setState({foundation: event.target.value});
    }
    if (type === 'dressing') {
      this.setState({dressing: event.target.value});
    }
  }

  checkboxChange = (event, type) => {
    let a = {};
    this.setState(state=>{
      a[type] = state[type].filter(val => val !== event.target.value);
      if(event.target.checked) a[type].push(event.target.value)
      return a;
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.classList.add("was-validated");
    if(event.target.checkValidity() === true){
      let salad = this.props.selectedSalad || new Salad();
      salad.foundation = this.state.foundation;
      salad.dressing = this.state.dressing;
      salad.proteins = this.state.proteins;
      salad.extras = this.state.extras;
      this.props.addSalad(salad);
      this.props.history.push('/view-order');
    }
  }

  render() {
    return (
      <form id="composeSaladForm" onSubmit={this.handleSubmit} noValidate>
        <SaladSelection type="foundation" items={this.props.inventory?.foundations || []} init={this.state.foundation} handleChange={this.selectionChange}/>
        <SaladCheckbox type="proteins" items={this.props.inventory?.proteins || []} itemList={this.state.proteins} handleChange={this.checkboxChange}/>
        <SaladCheckbox type='extras' items={this.props.inventory?.extras || []} itemList={this.state.extras} handleChange={this.checkboxChange}/>
        <SaladSelection type='dressing' items={this.props.inventory?.dressings || []} init={this.state.dressing} handleChange={this.selectionChange}/>
        <button type='submit' className="btn btn-primary" value='submit'>Spara sallad</button>
      </form>
    );
  }
}

const SaladSelection = ({type, items, init, handleChange}) => {
  return(
    <div className="form-group">
      <label htmlFor={type}>Välj en {type}</label>
      <select required className="form-control" value={init} name={type} onChange={(e)=>handleChange(e,type)}>
      <option value="">...</option>
      {Object.keys(items).map(name => (
        <option key={name} value={name}>
          {name} + {items[name].price} kr
        </option>
      ))}
      </select>
      <div className="invalid-feedback">Du måste välja en {type}</div>
    </div>
  );
}

const SaladCheckbox = ({type, items, itemList, handleChange}) => {
  return (
    <div className="form-group">
      <label htmlFor="checkbox">Välj en eller flera {type}</label>
      <ul>
        {Object.keys(items).map((name,i) =>(
          <li key={name}>
            <input type="checkbox" value={name} name={type} id={type+i} checked={itemList.includes(name)} onChange={(e)=>handleChange(e,type)}/>
            <label htmlFor={type+i}><span>{name}</span><span>{items[name].price} kr</span></label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComposeSalad;
