import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createInvoice } from "../features/invoices/invoiceSlice";

function GenerateInvoices(props) {
  const dispatch = useDispatch();
  const { selectedItems } = useSelector((state) => state.orders);
  const { isError, message } = useSelector((state) => state.invoices);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // return () => {
    //     dispatch(reset());
    // }
  }, [isError, message, dispatch]);

  // const clickGenerateInvoice = () => {
  //     var newSelectedItems = [...selectedItems];
  //     newSelectedItems = newSelectedItems.filter(x => props.sortedItems.some(y => y._id == x));
  //     dispatch(createInvoice(newSelectedItems));
  // }

  return (
    <button
      className="btn btn__invoice"
      // onClick={clickGenerateInvoice}
    >
      Generate Invoice/s
    </button>
  );
}

export default GenerateInvoices;
