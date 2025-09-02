import { Link } from 'react-router-dom'
import type { Peripheral } from '../../types/peripheral'
import { FaShoppingCart } from 'react-icons/fa'
import { TbListDetails } from 'react-icons/tb'

type PeripheralCardProps = {
    peripheral: Peripheral,
    openModal: (peripheral: Peripheral) => void,
    handleAddItemToCart: (peripheral: Peripheral) => void
}

const PeripheralCard: React.FC<PeripheralCardProps> = ({ peripheral, openModal, handleAddItemToCart }) => {
    const price = Number(peripheral.price)
    const discount = Number(peripheral.discount)
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price
    return (
        <>
            <div className='store-item'>
                {discount > 0 && (
                    <div className='store-item-discount-badge'>
                        -{discount}%
                    </div>
                )}
                {peripheral.image && (
                    <img
                        src={peripheral.image}
                        alt={peripheral.name}
                        className='store-item-image'
                    />
                )}

                <Link to={`/product/${peripheral.id}`} className='store-item-name'>
                    <h2>{peripheral.name}</h2>
                </Link>
                <div className='store-item-bottom'>
                    <div className='store-item-pricing'>
                        {discount > 0 ? (
                            <p><span className='original-price'>${price.toFixed(2)}</span> ${finalPrice.toFixed(2)}</p>
                        ) : (
                            <p className='price'>${price.toFixed(2)}</p>
                        )}
                    </div>
                    <div className='store-item-buttons'>
                        <button className='store-item-button add-to-cart' onClick={() => handleAddItemToCart(peripheral)}><FaShoppingCart /> Add to Cart</button>
                        <button className='store-item-button preview' onClick={() => openModal(peripheral)}><TbListDetails /> Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PeripheralCard
