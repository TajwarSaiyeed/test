import { FaRegFilePdf } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { createPdf } from '../features/invoices/invoiceSlice';

function Invoice(props) {
  const dispatch = useDispatch();

  const clickDownloadPdf = () => {
    const invoice = {
      invoiceId: props.invoice._id
    }

    dispatch(createPdf(invoice));
  }

  return (
    <>
      <div className="table-cell">{props.invoice.invoiceNo}</div>
        <div className="table-cell">{props.invoice.createdAt.substr(0,10)}</div>
        <div className="table-cell">{props.invoice.supplier}</div>
        <div className="table-cell">{props.invoice.items.length}</div>
        <div className="table-cell"><FaRegFilePdf onClick={clickDownloadPdf} title="Create PDF" /></div>
    </>
  )
}

export default Invoice