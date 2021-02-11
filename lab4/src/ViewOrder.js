import React from "react";

class ViewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange = (e, salad) => {
    e.preventDefault();
    this.props.changeSalad(salad);
    this.props.history.push('/resubmit-salad');

  }

  handleDelete = (e, salad) => {
  e.preventDefault();
  this.props.deleteSalad(salad);
  }


  render() {
    const totCost = this.props.order.reduce((sum, salad) =>
    {return sum + salad.cost;},0);
      return (
        <div>
        <ol>
      {this.props.order.map((salad) => (
        <li key={salad.id} className="orderView">
      <span>{[salad.foundation, ...salad.protein, ...salad.extras, salad.dressing].filter(x=>x).join(", ")} : {salad.cost} kr</span>

      <button type = 'button' className="btn btn-primary" onClick={(e) => this.handleChange(e, salad)}>Ändra</button>{' '}

      <button type = 'button' className="btn btn-danger" onClick={(e) => this.handleDelete(e, salad)}>Delete</button>{' '}
        </li>
      ))}
    </ol>
    <div><span>Total cost: {totCost} kr</span></div>
    </div>
             );
            }
          }


export default ViewOrder;
