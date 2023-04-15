import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBags, updateBags } from '../features/bags/bagsSlice';
import { FaShoppingBag, FaCheckCircle } from 'react-icons/fa';
import { RiShoppingBag3Line } from 'react-icons/ri';

function BagCountdown() {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(true);
    const [minBags, setMinBags] = useState(0);
    const [maxBags, setMaxBags] = useState(0);
    const { bags } = useSelector((state) => state.bags)

    useEffect(() => {
        dispatch(getBags());
    }, [dispatch]);

    const expand = () => {
        setExpanded((prevState) => {
          return !prevState
        });

        setMinBags(bags.min);
        setMaxBags(bags.max);

        var newBags = {...bags};
        newBags.min = minBags;
        newBags.max = maxBags;

        dispatch(updateBags(newBags));
    }

    return (
        <>
            {expanded &&
                <div className="bags bags-expanded text-uppercase" onClick={expand}>
                    <RiShoppingBag3Line size={15} /> {bags ? bags.min : ''}/{bags ? bags.max : ''} used
                </div>
            }
            {!expanded &&
                <div className="bags">
                    <RiShoppingBag3Line />
                    <input type="number" value={minBags} onChange={(e) => setMinBags(e.target.value)} /> / 
                    <input type="number" value={maxBags} onChange={(e) => setMaxBags(e.target.value)} /> used
                    &nbsp;<FaCheckCircle className="bags-check" onClick={expand} />
                </div>
            }
        </>
    )
}

export default BagCountdown