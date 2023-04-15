import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { updateItem } from "../features/orders/orderSlice";
import { order_status } from "../constants";

function OrderItemEdit(props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [status, setStatus] = useState(props.item.status);
  const [condition, setCondition] = useState(props.item.condition);
  const [flyersAdded, setFlyersAdded] = useState(
    props.item.flyersAdded ? props.item.flyersAdded : false
  );
  const [trackingNumberAgent, setTrackingNumberAgent] = useState(
    props.item.trackingNumberAgent
  );
  const [dateSupplierSent, setDateSupplierSent] = useState(
    props.item.dateSupplierSent
  );
  const [dateArrived, setDateArrived] = useState(props.item.dateArrived);
  const { isLoading, isError, message } = useSelector((state) => state.orders);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  const saveItem = (e) => {
    e.preventDefault();

    var newItem = { ...props.item };
    newItem.quantity = quantity;
    newItem.status = status;
    newItem.condition = condition;
    newItem.flyersAdded = flyersAdded;
    newItem.trackingNumberAgent = trackingNumberAgent;
    newItem.dateSupplierSent = dateSupplierSent;
    newItem.dateArrived = dateArrived;

    dispatch(updateItem(newItem));
  };

  const Loading = () => {
    if (isLoading) {
      return <Spinner />;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <form className="order-item-edit" onSubmit={saveItem}>
        <Loading />
        <img
          className="order-item-edit--image"
          src={props.item.imageUrl}
          alt={props.item.productName}
        />
        <h3>{props.item.productName}</h3>
        <div className="modal-control form-group">
          <label>Price: ${props.item.price}</label>
        </div>
        <div className="modal-control form-group">
          <label>Supplier: {props.item.supplier}</label>
        </div>
        <div className="modal-control form-group">
          <label>Model number: {props.item.modelNumber}</label>
        </div>
        <div className="modal-control form-group">
          <label>Shopify product ID: {props.item.shopifyProductId}</label>
        </div>
        <div className="modal-control form-group">
          <label>
            Shopify product handle: {props.item.shopifyProductHandle}
          </label>
        </div>
        <div className="modal-control form-group">
          <label>Quantity</label>
          <input
            className="form-control"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="modal-control form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">---</option>
            {order_status.map((item) => {
              return <option value={item.value}>{item.label}</option>;
            })}
          </select>
        </div>
        <div className="modal-control form-group">
          <label>Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">---</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="missing">Missing</option>
          </select>
        </div>
        <div className="modal-control form-group">
          <label>Flyers added</label>
          <select
            value={flyersAdded}
            onChange={(e) => setFlyersAdded(e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="modal-control form-group">
          <label>Tracking number (to agent)</label>
          <input
            className="form-control"
            type="text"
            value={trackingNumberAgent}
            onChange={(e) => setTrackingNumberAgent(e.target.value)}
          />
        </div>
        <div className="modal-control form-group">
          <label>Date supplier sent</label>
          <input
            className="form-control"
            type="date"
            value={dateSupplierSent ? dateSupplierSent.substr(0, 10) : null}
            onChange={(e) => setDateSupplierSent(e.target.value)}
          />
        </div>
        <div className="modal-control form-group">
          <label>Date arrived</label>
          <input
            className="form-control"
            type="date"
            value={dateArrived ? dateArrived.substr(0, 10) : null}
            onChange={(e) => setDateArrived(e.target.value)}
          />
        </div>
        <div className="modal-control form-group">
          <button type="submit" className="btn btn-block">
            Save Item Information
          </button>
        </div>
      </form>
    </>
  );
}

export default OrderItemEdit;
