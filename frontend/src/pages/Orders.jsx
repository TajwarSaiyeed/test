import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShopify, FaAngleDown, FaAngleUp } from "react-icons/fa";

import { toast } from "react-toastify";
import {
  importOrders,
  reset as importReset,
} from "../features/import/importSlice";
import {
  getOrders,
  getItems,
  reset as ordersReset,
  updateSelectedItems,
} from "../features/orders/orderSlice";
// import GenerateInvoices from '../components/GenerateInvoices'
import Order from "../components/Order";
import Spinner from "../components/Spinner";
import ColumnResizer from "react-table-column-resizer";

function Orders() {
  let [filter_order, setFilter_order] = useState("asc");
  let [orderitem, setOrderitem] = useState("");
  // let [sortedorders, setSortedorders] = useState([]);
  let [ref, setRef] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { filter, sub } = useParams();
  const {
    isLoading: importLoading,
    isError: importError,
    message: importMessage,
  } = useSelector((state) => state.import);
  const {
    orders,
    items,
    selectedItems,
    isLoading: ordersLoading,
    isError: ordersError,
    message: ordersMessage,
  } = useSelector((state) => state.orders);
  const { isLoading: invoicesLoading } = useSelector((state) => state.invoices);

  var sortedOrders = [...orders].reverse();
  var sortedItems = items;

  if (filter) {
    sortedOrders = sortedOrders.filter((x) => x.status == filter);
    sortedItems = sortedItems.filter((x) =>
      sortedOrders.some((y) => x.order == y._id)
    );
  }

  useEffect(() => {
    if (importError) {
      console.log(importMessage);
    }

    return () => {
      dispatch(importReset());
    };
  }, [importError, importMessage, dispatch]);

  useEffect(() => {
    if (ordersError) {
      console.log(ordersMessage);
    }

    if (orders.length <= 0) {
      // dispatch(ordersReset())
      // setRef(ref ? false : true)
    } else {
      // setSortedorders([...orders].reverse())
    }

    dispatch(getOrders());
    dispatch(getItems());

    return () => {
      //dispatch(ordersReset());
    };
  }, [ref, ordersError, ordersMessage, dispatch]);

  const onImport = () => {
    dispatch(importOrders());
  };

  const Loading = () => {
    if (importLoading || ordersLoading || invoicesLoading) {
      return <Spinner />;
    } else {
      return <></>;
    }
  };

  const checkedAll = () => {
    if (sortedItems.length == 0) {
      return false;
    }
    var checkedAll = true;
    sortedItems.map((item) => {
      if (!selectedItems.includes(item._id)) {
        checkedAll = false;
      }
    });
    return checkedAll;
  };

  const toggleCheckedAll = () => {
    var newSelectedItems = [];
    if (!checkedAll()) {
      sortedItems.map((item) => {
        newSelectedItems.push(item._id);
      });
    }
    dispatch(updateSelectedItems(newSelectedItems));
  };

  const refreshState = () => {
    setRef(ref ? false : true);
  };

  /**
   * Table data order asc / desc
   * @param name as string
   */
  const dataOrderBy = (name = "") => {
    setFilter_order(filter_order == "asc" ? "desc" : "asc");
    setOrderitem(name);
  };

  const statusShort = [
    "completed",
    "issues",
    "dispatched",
    "packed",
    "arrived",
    "supplierSent",
    "acknowledged",
  ];

  if (orderitem != "") {
    let temorder = filter_order;
    switch (orderitem) {
      case "name":
        if (temorder == "asc") {
          sortedOrders = [...sortedOrders].sort((a, b) =>
            a.customerName.toLowerCase() > b.customerName.toLowerCase() ? 1 : -1
          );
        } else {
          sortedOrders = [...sortedOrders].sort((a, b) =>
            a.customerName.toLowerCase() > b.customerName.toLowerCase() ? -1 : 1
          );
        }
        break;
      case "order":
        if (temorder == "asc") {
          sortedOrders = [...sortedOrders].sort((a, b) =>
            a.orderNumber.toLowerCase() > b.orderNumber.toLowerCase() ? 1 : -1
          );
        } else {
          sortedOrders = [...sortedOrders].sort((a, b) =>
            a.orderNumber.toLowerCase() > b.orderNumber.toLowerCase() ? -1 : 1
          );
        }
        break;
      case "date":
        if (temorder == "asc") {
          sortedOrders = [...sortedOrders].sort((a, b) =>
            new Date(a.dateOrdered).getTime() >
            new Date(b.dateOrdered).getTime()
              ? 1
              : -1
          );
        } else {
          sortedOrders = [...sortedOrders].sort((a, b) =>
            new Date(a.dateOrdered).getTime() >
            new Date(b.dateOrdered).getTime()
              ? -1
              : 1
          );
        }
        break;
      case "status":
        if (temorder == "asc") {
          sortedOrders = [...sortedOrders].sort((a, b) => {
            if (a.status == null) return 1;
            if (b.status == null) return -1;
            // array.sort((first, second) => hierarchyMap[first] - hierarchyMap[second]);
            const aIndex = statusShort.indexOf(a.status);
            const bIndex = statusShort.indexOf(b.status);

            return aIndex > bIndex ? -1 : 1;
          });
        } else {
          sortedOrders = [...sortedOrders].sort((a, b) => {
            if (a.status == null) return -1;
            if (b.status == null) return 1;

            const aIndex = statusShort.indexOf(a.status);
            const bIndex = statusShort.indexOf(b.status);

            return aIndex > bIndex ? 1 : -1;
          });
        }
        break;
      default:
        break;
    }
  } //

  return (
    <>
      <div className="page">
        <Loading />
        <h1>
          {sortedOrders.length} Orders Found
          {/* {user && user.accountType == 'admin' ? <button className="btn btn__import" title="This may take a few moments." onClick={onImport}><FaShopify /> Import</button>: ''} */}
        </h1>
        <div className="page-menu">
          <ul className="filters">
            <li
              className={
                filter && typeof sub == "undefined" ? "" : "filters__selected"
              }
            >
              <Link to="/orders">All Orders</Link>
            </li>
            <li className={filter == "acknowledged" ? "filters__selected" : ""}>
              <Link to="/orders/acknowledged">Acknowledged</Link>
            </li>
            <li className={filter == "supplierSent" ? "filters__selected" : ""}>
              <Link to="/orders/supplierSent">Supplier Sent</Link>
            </li>
            <li className={filter == "arrived" ? "filters__selected" : ""}>
              <Link to="/orders/arrived">Arrived</Link>
            </li>
            <li className={filter == "packed" ? "filters__selected" : ""}>
              <Link to="/orders/packed">Packed</Link>
            </li>
            <li className={filter == "dispatched" ? "filters__selected" : ""}>
              <Link to="/orders/dispatched">Dispatched</Link>
            </li>
            <li
              className={
                filter == "completed" && typeof sub == "undefined"
                  ? "filters__selected"
                  : ""
              }
            >
              <Link to="/orders/completed">Completed</Link>
            </li>
            <li className={filter == "issues" ? "filters__selected" : ""}>
              <Link to="/orders/issues">Issues</Link>
            </li>
          </ul>

          <hr />
          {(!filter || (filter && sub == "all")) && (
            <ul className="filters">
              <li className={filter ? "" : "filters__selected"}>
                <Link to="/orders">Active</Link>
              </li>
              <li className={filter == "completed" ? "filters__selected" : ""}>
                <Link to="/orders/all/completed">Completed</Link>
              </li>
              <li className={filter == "archived" ? "filters__selected" : ""}>
                <Link to="/orders/all/archived">Archived</Link>
              </li>
            </ul>
          )}
        </div>
        {(!filter ||
          filter == "supplierSent" ||
          filter == "arrived" ||
          filter == "acknowledged") && (
          <table className="table table-9 order-table test1">
            <thead>
              <tr>
                <th className="table-header">&nbsp;</th>
                <th className="table-header table-cell align-center">
                  <input
                    type="checkbox"
                    checked={checkedAll()}
                    onChange={toggleCheckedAll}
                  />
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("order")}
                  className="shortable table-header table-cell"
                >
                  Order&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "order") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "order") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("name")}
                  className="shortable table-header table-cell"
                >
                  Customer Name&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "name") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "name") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Address</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("date")}
                  className="shortable table-header table-cell"
                >
                  Date &nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "date") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "date") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Shipping Cost</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("status")}
                  className="shortable table-header table-cell"
                >
                  Status&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "status") {
                      return <FaAngleDown />;
                    } else if (
                      filter_order == "desc" &&
                      orderitem == "status"
                    ) {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order, k) => {
                return (
                  <Order
                    refreshState={refreshState}
                    key={k}
                    order={order}
                    filter={filter}
                  />
                );
              })}
            </tbody>
          </table>
        )}
        {filter == "packed" && (
          <table className="table table-9 order-table packed">
            <thead>
              <tr>
                <th className="table-header">&nbsp;</th>
                <th className="table-header table-cell align-center">
                  <input
                    type="checkbox"
                    checked={checkedAll()}
                    onChange={toggleCheckedAll}
                  />
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("order")}
                  className="shortable table-header table-cell"
                >
                  Order&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "order") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "order") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("name")}
                  className="shortable table-header table-cell"
                >
                  Customer Name&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "name") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "name") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Address</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("date")}
                  className="shortable table-header table-cell"
                >
                  Date Ordered&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "date") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "date") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Shipping Cost</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("status")}
                  className="shortable table-header table-cell"
                >
                  Status&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "status") {
                      return <FaAngleDown />;
                    } else if (
                      filter_order == "desc" &&
                      orderitem == "status"
                    ) {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order) => {
                return <Order order={order} filter={filter} />;
              })}
            </tbody>
          </table>
        )}
        {filter == "dispatched" && (
          <table className="table table-9 order-table">
            <thead>
              <tr>
                <th className="table-header">&nbsp;</th>
                <th className="table-header table-cell align-center">
                  <input
                    type="checkbox"
                    checked={checkedAll()}
                    onChange={toggleCheckedAll}
                  />
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("order")}
                  className="shortable table-header table-cell"
                >
                  Order&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "order") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "order") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("name")}
                  className="shortable table-header table-cell"
                >
                  Customer Name&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "name") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "name") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Address</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("date")}
                  className="shortable table-header table-cell"
                >
                  Date Ordered&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "date") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "date") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Shipping Cost</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("status")}
                  className="shortable table-header table-cell"
                >
                  Status&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "status") {
                      return <FaAngleDown />;
                    } else if (
                      filter_order == "desc" &&
                      orderitem == "status"
                    ) {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order, k) => {
                return <Order key={k} order={order} filter={filter} />;
              })}
            </tbody>
          </table>
        )}
        {filter == "completed" && (
          <table className="table table-9 order-table">
            <thead>
              <tr>
                <th className="table-header">&nbsp;</th>
                <th className="table-header table-cell align-center">
                  <input
                    type="checkbox"
                    checked={checkedAll()}
                    onChange={toggleCheckedAll}
                  />
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("order")}
                  className="shortable table-header table-cell"
                >
                  Order&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "order") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "order") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("name")}
                  className="shortable table-header table-cell"
                >
                  Customer Name&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "name") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "name") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Address</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("date")}
                  className="shortable table-header table-cell"
                >
                  Date Ordered&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "date") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "date") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Shipping Cost</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("status")}
                  className="shortable table-header table-cell"
                >
                  Status&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "status") {
                      return <FaAngleDown />;
                    } else if (
                      filter_order == "desc" &&
                      orderitem == "status"
                    ) {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">&nbsp;</th>
              </tr>
            </thead>
            {sortedOrders.map((order, k) => {
              return <Order key={k} order={order} filter={filter} />;
            })}
          </table>
        )}
        {filter == "archived" && (
          <table className="table table-9 order-table">
            <thead>
              <tr>
                <th className="table-header">&nbsp;</th>
                <th className="table-header table-cell align-center">
                  <input
                    type="checkbox"
                    checked={checkedAll()}
                    onChange={toggleCheckedAll}
                  />
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("order")}
                  className="shortable table-header table-cell"
                >
                  Order&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "order") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "order") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("name")}
                  className="shortable table-header table-cell"
                >
                  Customer Name&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "name") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "name") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Address</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("date")}
                  className="shortable table-header table-cell"
                >
                  Date &nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "date") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "date") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Shipping Cost</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("status")}
                  className="shortable table-header table-cell"
                >
                  Status&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "status") {
                      return <FaAngleDown />;
                    } else if (
                      filter_order == "desc" &&
                      orderitem == "status"
                    ) {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">&nbsp;</th>
              </tr>
            </thead>
            {sortedOrders.map((order, k) => {
              return <Order key={k} order={order} filter={filter} />;
            })}
          </table>
        )}
        {filter == "issues" && (
          <table className="table table-9 order-table">
            <thead>
              <tr>
                <th className="table-header">&nbsp;</th>
                <th className="table-header table-cell align-center">
                  <input
                    type="checkbox"
                    checked={checkedAll()}
                    onChange={toggleCheckedAll}
                  />
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("order")}
                  className="shortable table-header table-cell"
                >
                  Order&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "order") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "order") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("name")}
                  className="shortable table-header table-cell"
                >
                  Customer Name&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "name") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "name") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Address</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("date")}
                  className="shortable table-header table-cell"
                >
                  Date Ordered&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "date") {
                      return <FaAngleDown />;
                    } else if (filter_order == "desc" && orderitem == "date") {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">Shipping Cost</th>
                <ColumnResizer className="columnResizer" />
                <th
                  onClick={(e) => dataOrderBy("status")}
                  className="shortable table-header table-cell"
                >
                  Status&nbsp;
                  {(() => {
                    if (filter_order == "asc" && orderitem == "status") {
                      return <FaAngleDown />;
                    } else if (
                      filter_order == "desc" &&
                      orderitem == "status"
                    ) {
                      return <FaAngleUp />;
                    }
                  })()}
                </th>
                <ColumnResizer className="columnResizer" />
                <th className="table-header table-cell">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order, k) => {
                return <Order key={k} order={order} filter={filter} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Orders;
