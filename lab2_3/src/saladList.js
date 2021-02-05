import "./styles.css";

const SaladList = (props) => {
  return (
    <ol>
      {props.salads.map((salad, index) => (
        <li key={"salad"+index} className="saladList">
          <span>{[salad.foundation, ...salad.proteins, ...salad.extras, salad.dressing].filter(x=>x).join(", ")}</span>
          <button
            className="btn btn-primary"
            onClick={()=>props.removeSalad(salad)}
          >
            delete
          </button>
          <span className="price"> Price: {salad.price()}</span>
        </li>
      ))}
    </ol>
  );
}

export default SaladList;
