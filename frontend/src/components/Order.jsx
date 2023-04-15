import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

import {
  updateOrder,
  reset,
  updateSelectedItems,
} from "../features/orders/orderSlice";
import OrderInfo from "./OrderInfo";
import OrderEditModal from "./OrderEditModal";
import { format } from "date-fns";
import Notes from "./Notes";
import { order_status } from "../constants";

function Order({ order, filter, refreshState }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState(false);
  const [expandedEdit, setExpandedEdit] = useState(false);
  const { items, selectedItems, isError, message } = useSelector(
    (state) => state.orders
  );

  // const { orders, items, selectedItems, isLoading: ordersLoading, isError: ordersError, message: ordersMessage } = useSelector(
  //     (state) => state.orders
  // );

  const expand = () => {
    setExpanded((prevState) => {
      return !prevState;
    });
  };

  const expandEdit = () => {
    setExpandedEdit((prevState) => {
      return !prevState;
    });
  };

  const ExpandIcon = () => {
    if (expanded == true) {
      return <FaAngleUp />;
    } else {
      return <FaAngleDown />;
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    return () => {
      //dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const selectOrderStatus = (e) => {
    // refreshState()
    let now = new Date();

    var newOrder = { ...order };
    newOrder.status = e.target.value;

    switch (newOrder.status) {
      case "packed":
        if (!newOrder.datePacked) {
          newOrder.datePacked = now;
        }
        break;
      case "dispatched":
        if (!newOrder.dateDispatched) {
          newOrder.dateDispatched = now;
        }
        break;
      case "completed":
        if (!newOrder.dateCompleted) {
          newOrder.dateCompleted = now;
        }
        break;
      default:
        break;
    }
    order = newOrder;
    dispatch(updateOrder(newOrder));
  };

  const expandNotes = () => {
    setExpandedNotes((prevState) => {
      if (prevState == true) {
        return false;
      } else {
        return true;
      }
    });
  };

  const orderItems = items.filter((x) => x.order == order._id);

  const checked = () => {
    if (orderItems.length == 0) {
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
    console.log(selectedItems);
    var newSelectedItems = selectedItems.filter(
      (x) => !orderItems.some((y) => y._id == x)
    );
    console.log(newSelectedItems);
    if (!checked()) {
      orderItems.map((item) => {
        newSelectedItems.push(item._id);
      });
    } else {
    }
    dispatch(updateSelectedItems(newSelectedItems));
  };

  return (
    <>
      <tr>
        <td className="table-cell" onClick={expand}>
          <ExpandIcon />
        </td>

        <td className="table-cell">
          <input type="checkbox" checked={checked()} onChange={toggleChecked} />
        </td>
        <td className="columnResizer" />
        <td className="table-cell">{order.orderNumber}</td>
        <td className="columnResizer" />
        <td className="table-cell">{order.customerName}</td>
        <td className="columnResizer" />
        <td className="table-cell">{order.customerAddress}</td>
        <td className="columnResizer" />
        <td className="table-cell">
          {format(new Date(order.dateOrdered.substring(0, 10)), "dd LLL yyyy")}
        </td>
        <td className="columnResizer" />
        <td className="table-cell">${order.shippingCost}</td>
        <td className="columnResizer" />
        <td className="table-cell">
          <select
            value={order.status ? order.status : ""}
            className={
              order.status
                ? `${order.status} order-status order`
                : "order-status order"
            }
            onChange={selectOrderStatus}
          >
            <option value="">---</option>
            {order_status.map((item) => {
              return <option value={item.value}>{item.label}</option>;
            })}
          </select>
        </td>
        <td className="columnResizer" />
        <td className="table-cell text-center d-flex item-center justify-center gap-5px">
          <span className="clipbord om1">
            <HiOutlineClipboardList onClick={expandNotes} />
          </span>
        </td>
        <td className="order-item-notes">
          <Notes
            expanded={expandedNotes}
            clickExpendEvent={expandNotes}
            item={order}
          />
        </td>
      </tr>
      <tr>
        <td colSpan={18}>
          <OrderInfo key={order._id} expanded={expanded} order={order} />
          <OrderEditModal
            expanded={expandedEdit}
            onClickOutside={expandEdit}
            order={order}
          />
        </td>
      </tr>
    </>
  );
}

export default Order;
