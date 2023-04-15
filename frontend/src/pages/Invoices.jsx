import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import Invoice from '../components/Invoice';
import Spinner from '../components/Spinner';
import { getInvoices, reset } from '../features/invoices/invoiceSlice';

function Invoices() {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { invoices, isLoading, isError, message } = useSelector((state) => state.invoices);

    var sortedInvoices = [...invoices];
    sortedInvoices.sort((a, b) => { return b.invoiceNo - a.invoiceNo; });

    useEffect(() => {
        if (user && user.accountType != 'admin') {
            navigate('/');
        }

        if (isError) {
            console.log(message);
        }

        dispatch(getInvoices());

        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch]);

    const Loading = () => {
        if (isLoading) {
            return <Spinner />
        } else {
            return <></>
        }
    }

    return (
        <div className='page'>
            <Loading />
            <h1>{invoices.length} Invoices Found</h1>
            <div className="table table-5 invoice-table">
                <div className="table-header table-cell">Invoice No.</div>
                <div className="table-header table-cell">Date</div>
                <div className="table-header table-cell">Supplier</div>
                <div className="table-header table-cell">No. Items</div>
                <div className="table-header table-cell">Create PDF</div>
                {sortedInvoices.map((invoice) => {
                        return <Invoice invoice={invoice} />
                    })
                }
            </div>
        </div>
    )
}

export default Invoices