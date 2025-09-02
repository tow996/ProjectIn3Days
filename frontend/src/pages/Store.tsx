import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'
import PageLayout from '../layout/PageLayout'
import type { Peripheral, PeripheralResponse } from '../types/peripheral'
import PeripheralCard from '../components/Store/PeripheralCard'
import { useContext, useState } from 'react'
import { formatKey } from '../utils/formatKey'
import { FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '../store/CartContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const fetchData = async (): Promise<PeripheralResponse> => {
    const response = await api.get('/peripherals/')
    return response.data
}

const Store = () => {
    const { data, isLoading, error } = useQuery<PeripheralResponse>({
        queryKey: ['peripherals'],
        queryFn: fetchData,
    })
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState<Peripheral| null>(null);
    const cart = useContext(CartContext);
    const openModal = (peripheral: Peripheral) => {
        setModalContent(peripheral);
        setModal(true);
    };

    const handleAddItemToCart = (peripheral: Peripheral) => {
        if (cart) {
            cart.addItem(peripheral);
        }
        setModal(false);
        setModalContent(null);

        const ToastWithButton = () => (
            <div>
                Item added to cart!{" "}
                <button
                    style={{
                        marginTop: "8px",
                        marginBottom: "8px",
                        padding: "4px 8px",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        toast.dismiss();
                        navigate("/checkout");
                    }}
                >
                    Go to Checkout
                </button>
            </div>
        );

        toast.success(<ToastWithButton />);
    };
    if (isLoading) {
        return (
            <PageLayout>
                <div className='build-wrapper'>
                    <p>Loading...</p>
                </div>
            </PageLayout>
        )
    }

    if (error) {
        return (
            <PageLayout>
                <div className='build-wrapper'>
                    <p>Error: {(error as Error).message}</p>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <title>Store - NEXUS PC</title>
            <div className='store-wrapper'>
                <h1>Store</h1>
                <div className='store-items'>
                    {data && data.peripherals.length > 0 ? (
                        data.peripherals.map((peripheral) => (
                            <PeripheralCard key={peripheral.id} peripheral={peripheral} openModal={openModal} handleAddItemToCart={handleAddItemToCart} />
                        ))
                    ) : (
                        <p>No peripherals available.</p>
                    )}
                </div>
            </div>
            {modal && modalContent && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModal(false)}>&times;</span>
                        
                        {modalContent.image && <img src={modalContent.image} alt={modalContent.name} className='modal-image' />}
                        <h2>{modalContent.name}</h2>
                        <div className="modal-description">
                            {Object.entries(modalContent.description).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{formatKey(key)}:</strong> {value}
                                </p>
                            ))}
                        </div>
                        {modalContent.discount > 0 ? (
                            <p>
                                <span className='original-price'>${Number(modalContent.price).toFixed(2)}</span>{" "}
                                ${(Number(modalContent.price) * (1 - modalContent.discount / 100)).toFixed(2)}
                            </p>
                        ) : (
                            <p className='price'>${Number(modalContent.price).toFixed(2)}</p>
                        )}
                        <button className='store-item-button add-to-cart' onClick={() => handleAddItemToCart(modalContent)}><FaShoppingCart /> Add to Cart</button>
                    </div>
                </div>
            )}
        </PageLayout>
    )
}

export default Store
