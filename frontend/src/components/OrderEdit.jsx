import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import OrderItemEdit from './OrderItemEdit' 
import Spinner from './Spinner'
import { updateOrder } from '../features/orders/orderSlice';
import { order_status } from '../constants';

function OrderEdit(props) {
    const dispatch = useDispatch();
    const [customerName, setCustomerName] = useState(props.order.customerName);
    const [customerAddress, setCustomerAddress] = useState(props.order.customerAddress);
    const [shippingCost, setShippingCost] = useState(props.order.shippingCost);
    const [status, setStatus] = useState(props.order.status);
    const [trackingNumberCustomer, setTrackingNumberCustomer] = useState(props.order.trackingNumberCustomer);
    const [dateOrdered, setDateOrdered] = useState(props.order.dateOrdered);
    const [datePacked, setDatePacked] = useState(props.order.datePacked);
    const [dateDispatched, setDateDispatched] = useState(props.order.dateDispatched);
    const [dateCompleted, setDateCompleted] = useState(props.order.dateCompleted);
    const { items, isLoading, isError, message } = useSelector(
        (state) => state.orders
    )

    useEffect(() => {
        if (isError) {
          console.log(message);
        }
    }, [isError, message, dispatch]);

    const saveOrder = (e) => {
        e.preventDefault();

        var newOrder = {...props.order};
        newOrder.customerName = customerName;
        newOrder.customerAddress = customerAddress;
        newOrder.shippingCost = shippingCost;
        newOrder.status = status;
        newOrder.trackingNumberCustomer = trackingNumberCustomer;
        newOrder.dateOrdered = dateOrdered;
        newOrder.datePacked = datePacked;
        newOrder.dateDispatched = dateDispatched;
        newOrder.dateCompleted = dateCompleted;

        dispatch(updateOrder(newOrder));
    }

    const Loading = () => {
        if (isLoading) {
            return <Spinner />
        } else {
            return <></>
        }
    }

    return (
        <>
            <Loading />
            <div className="order-edit-header">
                <h1 className="order-edit-heading">View/Edit Order</h1>
                <h2 className="order-edit-subheading">Order #{props.order.orderNumber}</h2>
            </div> 
            <div className='order-edit-grid'>
                <div className='order-edit-information'>
                    <form onSubmit={saveOrder}>
                        <h2>Order Information</h2>
                        <div className="modal-control form-group">
                            <label>Customer name</label>
                            <input className="form-control" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        </div>
                        <div className="modal-control form-group">
                            <label>Customer address</label>
                            <input className="form-control" type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} /></div>
                        <div className="modal-control form-group">
                            <label>Shipping cost ($)</label>
                            <input className="form-control" type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} /></div>
                        <div className="modal-control form-group">
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">---</option>
                                {order_status.map((item) => {
                                    return <option value={item.value}>{item.label}</option>
                                })}
                            </select>
                        </div>
                        <div className="modal-control form-group">
                            <label>Tracking number (to customer)</label>
                            <input className="form-control" type="text" value={trackingNumberCustomer} onChange={(e) => setTrackingNumberCustomer(e.target.value)} />
                        </div>
                        <div className="modal-control form-group">
                            <label>Date</label>
                            <input className="form-control" type="date" value={dateOrdered ? dateOrdered.substr(0, 10) : null} onChange={(e) => setDateOrdered(e.target.value)} />
                        </div>
                        <div className="modal-control form-group">
                            <label>Date packed</label>
                            <input className="form-control" type="date" value={datePacked ? datePacked.substr(0, 10) : null} onChange={(e) => setDatePacked(e.target.value)} />
                        </div>
                        <div className="modal-control form-group">
                            <label>Date dispatched</label>
                            <input className="form-control" type="date" value={dateDispatched ? dateDispatched.substr(0, 10) : null} onChange={(e) => setDateDispatched(e.target.value)} />
                        </div>
                        <div className="modal-control form-group">
                            <label>Date completed</label>
                            <input className="form-control" type="date" value={dateCompleted ? dateCompleted.substr(0, 10) : null} onChange={(e) => setDateCompleted(e.target.value)} />
                        </div>
                        <div className="modal-control form-group">
                            <button type="submit" className="btn btn-block">Save Order Information</button>
                        </div>
                    </form>
                </div>
                <div className='order-item-edit-container'>
                    <h2>Items Ordered</h2>
                    {items.map((item) => {
                        if (item.order == props.order._id) {
                            return <OrderItemEdit expanded={props.expanded} item={item} />
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default OrderEdit