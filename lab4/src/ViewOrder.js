import React from "react";

const ViewOrder = ({order, remove, change, history, placeOrder}) => {
  const handleEditButton = (salad) => {
    change(salad)
    history.push('/compose-salad')
  }
  const handlePlaceOrder = () => {
    placeOrder((ok)=>{
      if(ok) order.forEach(salad => remove(salad));
      document.getElementById("message").innerHTML = (ok)?"Thanks for your order!":"Something went wrong... :(";
    })
  }

  return (
    <div>
      <span id="message"></span>
      <ol>
        {order.map((salad,i) => (
          <li key={"salad"+i} className="saladList">
            <span>{[salad.foundation, ...salad.proteins, ...salad.extras, salad.dressing].filter(x=>x).join(", ")}</span>
            <div>
              <span>{salad.price()} kr</span>
              <button type='button' className="btn btn-primary" onClick={() => handleEditButton(salad)}>Ändra</button>{' '}
              <button type='button' className="btn btn-danger" onClick={() => remove(salad)}>Ta bort</button>{' '}
            </div>
          </li>
        ))}
      </ol>
      <button className="btn btn-primary" onClick={handlePlaceOrder}>Beställ: {order.reduce((sum, salad) =>sum + salad.price(),0)} kr</button>
    </div>
  );
}


export default ViewOrder;
