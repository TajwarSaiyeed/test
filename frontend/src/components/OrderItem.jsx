import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineClipboardList } from "react-icons/hi";

import {
  updateItem,
  reset,
  updateSelectedItems,
} from "../features/orders/orderSlice";
import { updateBags } from "../features/bags/bagsSlice";
import FsLightbox from "fslightbox-react";
import Notes from "./Notes";
import { order_status } from "../constants";

function OrderItem({ item }) {
  const dispatch = useDispatch();
  const [expandedNotes, setExpandedNotes] = useState(false);
  const { selectedItems, isError, message } = useSelector(
    (state) => state.orders
  );
  const { bags } = useSelector((state) => state.bags);
  const [toggler, setToggler] = useState(false);

  const expandNotes = () => {
    setExpandedNotes((prevState) => {
      if (prevState == true) {
        return false;
      } else {
        return true;
      }
    });
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    return () => {
      //dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const selectItemStatus = (e) => {
    let now = new Date();

    var newItem = { ...item };
    newItem.status = e.target.value;

    switch (newItem.status) {
      case "supplierSent":
        if (!newItem.dateSupplierSent) {
          newItem.dateSupplierSent = now;
        }
        break;
      case "arrived":
        if (!newItem.dateArrived) {
          newItem.dateArrived = now;
        }
        break;
      case "packed":
        var newBags = { ...bags };
        newBags.min = bags.min - 1;

        dispatch(updateBags(newBags));
        break;

      default:
        break;
    }

    dispatch(updateItem(newItem));
  };

  const toggleItemSelected = (e) => {
    var newSelectedItems = [...selectedItems];
    if (!e.target.checked) {
      newSelectedItems = newSelectedItems.filter((x) => !x.includes(item._id));
      dispatch(updateSelectedItems(newSelectedItems));
    } else {
      newSelectedItems.push(item._id);
      dispatch(updateSelectedItems(newSelectedItems));
    }
  };

  console.log("iatem is: ", item);

  return (
    <>
      <tr>
        <td className="bg-white">&nbsp;&nbsp;&nbsp;</td>
        <td className="columnResizer" />
        <td className="table-cell">
          <input
            type="checkbox"
            checked={selectedItems.includes(item._id)}
            onChange={toggleItemSelected}
          />
        </td>
        <td className="columnResizer" />
        <td className="table-cell">
          {item?.quantity < 10 ? `0${item?.quantity}` : item?.quantity}
        </td>
        <td className="columnResizer" />
        <td className="table-cell">{item.productName}</td>
        <td className="columnResizer" />
        <td
          className="table-cell flex-toggle position-relative content-center"
          onClick={() => setToggler(!toggler)}
        >
          <span className="flex-toggle">
            <img className="color-white" src="maximize.svg" alt="overley" />
          </span>
          <img src={item.imageUrl} alt={item.productName} />
          <FsLightbox toggler={toggler} sources={[item.imageUrl]} />
        </td>
        <td className="columnResizer" />
        <td className="table-cell">{item?.sku}</td> {/* update the data */}
        <td className="columnResizer" />
        <td className="table-cell variant-name">
          {item.productVariant.map((item, index) => (
            <div key={index}>
              <span>{`Variant ${index + 1} :`}</span>:&nbsp;{item.value}{" "}
              {/** varient add */}
            </div>
          ))}
        </td>
        <td className="columnResizer" />
        <td className="table-cell">${item?.cost}</td> {/* product price */}
        <td className="columnResizer" />
        <td className="table-cell">{item?.supplier}</td>
        <td className="columnResizer" />
        <td
          className="table-cell"
          style={{
            color: "#ff0",
            textDecoration: "underline",
          }}
        >
          {item?.trackingNumberAgent}
        </td>
        <td className="columnResizer" />
        <td className="table-cell">
          <select
            value={item.status ? item.status : ""}
            className={
              item.status
                ? `${item.status} order-status items`
                : "order-status items"
            }
            onChange={selectItemStatus}
          >
            <option value="">---</option>
            {order_status.map((item) => {
              return <option value={item.value}>{item.label}</option>;
            })}
          </select>
        </td>
        <td className="columnResizer" />
        <td className="table-cell">
          <span className="clipbord om2">
            <HiOutlineClipboardList onClick={expandNotes} />
          </span>
        </td>
        <td className="order-item-notes">
          <Notes
            expanded={expandedNotes}
            clickExpendEvent={expandNotes}
            item={item}
          />
        </td>
      </tr>
    </>
  );
}

export default OrderItem;
