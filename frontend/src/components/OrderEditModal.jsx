import OrderEdit from './OrderEdit';
import Modal from './Modal';

function OrderEditModal(props) {

    if (props.expanded) {
        return (
            <Modal onClickOutside={props.onClickOutside}>
                <OrderEdit order={props.order} />
            </Modal>
        )
    } else {
        return <></>
    }
}

export default OrderEditModal