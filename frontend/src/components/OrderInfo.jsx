/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { updateSelectedItems } from "../features/orders/orderSlice";
import Notes from "./Notes";
import ColumnResizer from "react-table-column-resizer";
import OrderItem from "./OrderItem";

function OrderInfo({ expanded, order }) {
  const dispatch = useDispatch();
  const [expandedNotes, setExpandedNotes] = useState(false);
  const { items, selectedItems } = useSelector((state) => state.orders);

  const expandNotes = () => {
    setExpandedNotes((prevState) => {
      return !prevState;
    });
  };

  const ExpandIcon = () => {
    if (expandedNotes === true) {
      return <FaAngleUp />;
    } else {
      return <FaAngleDown />;
    }
  };

  const orderItems = items.filter((x) => x.order === order._id);

  const checked = () => {
    if (orderItems.length === 0) {
      return false;
    }
    var checked = true;
    orderItems.map((item) => {
      if (!selectedItems.includes(item._id)) {
        checked = false;
      }
    });
    return checked;
  };

  const toggleChecked = () => {
    var newSelectedItems = selectedItems.filter(
      (x) => !orderItems.some((y) => y._id === x)
    );
    if (!checked()) {
      orderItems.map((item) => {
        newSelectedItems.push(item._id);
        return "";
      });
    } else {
    }
    dispatch(updateSelectedItems(newSelectedItems));
  };

  const itemDemoData = {
    quantity: 5,
    productName: "Test",
    imageUrl:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
    sku: "sku-123",
    productVariant: [
      {
        label: "Red",
        value: "Red",
      },
      {
        label: "Blue",
        value: "Blue",
      },
    ],
    cost: 20,
    supplier: "Test Supplier",
    trackingNumberAgent: 45745212745457874,
    order_status: [
      "Supplier sent",
      "Arrived",
      "Packed",
      "Dispatched",
      "Completed",
      "Issues",
      "Acknowledged",
      "Archived",
    ],
  };

  if (expanded) {
    return (
      <table className="order-info-container table-inner-9">
        <thead className="table table-10">
          <tr>
            <th className="bg-white text-left">&nbsp;&nbsp;&nbsp;</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">
              <input
                type="checkbox"
                checked={checked()}
                onChange={toggleChecked}
              />
            </th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Quantity</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Product</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Image</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">SKU</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Variant</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Cost</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Supplier</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Tracking</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell">Status</th>
            <ColumnResizer className="columnResizer" />
            <th className="table-header table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            if (item.order === order._id) {
              return <OrderItem item={item} />;
            }
            return "";
          })}
        </tbody>
        {/* <div className="order-info-notes">
                        <h3 style={{cursor: 'pointer'}} onClick={expandNotes}><ExpandIcon /> Order Notes</h3>
                        <Notes expanded={expandedNotes} order={order} />
                    </div> */}
      </table>
    );
  } else {
    return <></>;
  }
}

export default OrderInfo;
