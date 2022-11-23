const Modal = (props) => {
  const buyItem = () => {
    props.toggleSuccess();
    props.resetCart();
    props.toggleCart();
  };

  return (
    <div className="modal-background">
      <div className="modal-inner">
        <h3> Do you want to buy these items?</h3>

        <div className="modal-buttons">
          <button className="modal-btn" onClick={buyItem}>
            Yes, sure!
          </button>
          <button className="modal-btn" onClick={props.toggleModal}>
            No,thanks.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
