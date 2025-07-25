import React, { useState } from 'react'
import { MdOutlineArrowCircleRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Offer from './Offer';

const EditProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        price: '453',
        type: '',
        category: '',
        color: [],
        has_sizes: null,
        sizes: [{ size: '', quantity: '' }],
        offer: {
            is_active: false,
            offer_price: '',
            start_date: '',
            end_date: '',
        }
    });

    const [ active, setActive ] = useState("edit");

    // go back from editing
   const handleCloseEdit = () => {
    navigate(-1)
    };

    // handle form offer change
    const handleOfferChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            offer: {
            ...prev.offer,
            [name]: value,
            },
        }));
        };

    // enable and disable offer function
    const toggleOffer = () => {
        setFormData(prev => ({
            ...prev,
            offer: {
            ...prev.offer,
            is_active: !prev.offer.is_active,
            },
        }));
        };

  return (
    <div className='bg-white container px-4 py-6'>
        <div className="relative flex items-center justify-center w-full mb-6">
            <MdOutlineArrowCircleRight
            onClick={handleCloseEdit}
            className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
            />
            <h2 className="text-base font-bold">تعديل المنتج</h2>
        </div>

        {/* switch between edit and add offer buttons */}
        <div className='flex items-center justify-center gap-6 text-sm px-6 my-8'>
            <button
                onClick={() => setActive("edit")}
                className={`${active === 'edit' ? 'text-primary underline' : 'text-gray-400'}`}>
                بيانات المنتج
            </button>
            <button
                onClick={() => setActive("offer")}
                className={`${active === 'offer' ? 'text-primary underline' : 'text-gray-400'}`}>
                إضافة عرض
            </button>
        </div>
        { active === 'edit' ?
        (
            <div>
                edit
            </div>
        )
        :
        (
            <Offer 
                formData={formData}
                toggleOffer={toggleOffer}
                handleOfferChange={handleOfferChange}
                />
        )}
    </div>
  )
}

export default EditProduct
