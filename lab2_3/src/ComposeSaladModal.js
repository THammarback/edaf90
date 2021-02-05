import React from "react";
import ComposeSalad from "./ComposeSalad";

class ComposeSaladModal extends React.Component {

  render() {
    return (
      <div>
        <button
          id="createButton"
          type="button"
          data-toggle="modal"
          data-target="#ComposeSaladModal"
          onClick={this.props.createSalad}
        >
          Komponera din egen sallad
        </button>
        <div
          className="modal fade"
          id="ComposeSaladModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="composeSaladModalModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="composeSaladModalModalLabel">
                  Komponera din egen sallad
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ComposeSalad {...this.props} />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  form="composeSaladForm"
                  className="btn btn-primary"
                >
                  Spara
                </button>
                <button
                  id="modalCloseButton"
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Ta bort
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComposeSaladModal;
