import React, { useState } from 'react'
import { MdOutlineArrowCircleRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Offer from './Offer';
import ProductModal from './ProductModal';

const EditProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'ايفون 14',
        description: 'الجديد من شركة ابل',
        brand: 'apple',
        price: '453',
        type: 'أجهزة',
        category: 'all',
        picture: null,
        color: 'أسود',
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

      // handle input chang when the user type
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

       // handle submit form changes
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form data:", formData)
      };
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
            <ProductModal 
                handleSubmit={handleSubmit}
                handleCloseProduct={handleCloseEdit}
                handleChange={handleChange}
                formData={formData}
                setFormData={setFormData}
            />
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
