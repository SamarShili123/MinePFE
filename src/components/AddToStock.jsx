import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useAuth } from '../contexts/authContext';

function AddToStock() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        product: '',
        price: '',
        quantity: '',
        factureNumber: '',
        note: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const addToStock = async () => {
        try {
            const movementRef = collection(firestore, 'movements');
            await addDoc(movementRef, {
                date: formData.date,
                product: formData.product,
                price: formData.price,
                quantity: formData.quantity,
                factureNumber: formData.factureNumber,
                note: formData.note,
                user: currentUser.uid
            });

            toast.success('Added to stock successfully');
            navigate("/dashboard/stock")
        } catch (error) {
            console.error('Error adding to stock: ', error);
            toast.error('Failed to add to stock');
        }
    };

    return (
        <div className='AddToStock'>
            <ToastContainer />
            <div className="addToStockForm">
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" value={formData.date} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="product">Product</label>
                    <input type="text" id="product" value={formData.product} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={formData.price} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" value={formData.quantity} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="factureNumber">Facture Number</label>
                    <input type="text" id="factureNumber" value={formData.factureNumber} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="note">Note</label>
                    <textarea id="note" value={formData.note} onChange={handleInputChange}></textarea>
                </div>
            </div>
            <div>
                <Link to="/dashboard/stock">cancel</Link>
            <button onClick={addToStock}>Add</button>
            </div>
        </div>
    )
}

export default AddToStock;