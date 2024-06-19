import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { HotelFormData } from '../ManageHotelForm';

function GuestsSection() {
    const {register, formState:{errors}} = useFormContext<HotelFormData>();
    return (
        <div className='flex flex-col gap-1 px-10'>
            <h2 className='text-2xl font-bold mb-3'>Guests</h2>
            <div className='px-10 py-8 bg-gray-300 border'>
                <div className='flex md:flex-row gap-5 flex-col'>
                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        Adults
                        <input min={0} type="number" className='border rounded w-full py-1 px-2 font-normal' {...register("adultCount", {required: "This field is required"})}></input>
                        {errors.adultCount ? (<p className='text-red-500 text-sm font-bold'>{errors.adultCount.message}</p>):(<></>)}
                    </label>
                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        Children
                        <input min={0} type="number" className='border rounded w-full py-1 px-2 font-normal' {...register("childCount", {required: "This field is required"})}></input>
                        {errors.childCount ? (<p className='text-red-500 text-sm font-bold'>{errors.childCount.message}</p>):(<></>)}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default GuestsSection