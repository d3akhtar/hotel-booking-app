import { useFormContext } from 'react-hook-form'
import { HotelFormData } from '../ManageHotelForm';

function DetailsSection() {
    const {register,formState:{errors}} = useFormContext<HotelFormData>();
  return (
    <div className='flex flex-col gap-4 px-10'>
        <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Name
                    <input className='border rounded w-full py-1 px-2 font-normal' {...register("name", {required: "This field is required"})}></input>
                    {errors.name ? (<p className='text-red-500 text-sm font-bold'>{errors.name.message}</p>):(<></>)}
                </label>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    City
                    <input className='border rounded w-full py-1 px-2 font-normal' {...register("city", {required: "This field is required"})}></input>
                    {errors.city ? (<p className='text-red-500 text-sm font-bold'>{errors.city.message}</p>):(<></>)}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Country
                    <input className='border rounded w-full py-1 px-2 font-normal' {...register("country", {required: "This field is required"})}></input>
                    {errors.country ? (<p className='text-red-500 text-sm font-bold'>{errors.country.message}</p>):(<></>)}
                </label>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Description
                    <textarea rows={15} style={{resize:"none"}} className='border rounded w-full py-1 px-2 font-normal' {...register("description", {required: "This field is required"})}></textarea>
                    {errors.description ? (<p className='text-red-500 text-sm font-bold'>{errors.description.message}</p>):(<></>)}
                </label>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold w-[50%]'> { /* w-[x%] is how we can give an exact width percentage in tailwind */ }
                    Price Per night
                    <input min={1} className='border rounded w-full py-1 px-2 font-normal' type="number" {...register("pricePerNight", {required: "This field is required"})}></input>
                    {errors.pricePerNight ? (<p className='text-red-500 text-sm font-bold'>{errors.pricePerNight.message}</p>):(<></>)}
                </label>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold w-[50%]'>
                    Star Rating
                    <select defaultValue="" className='border rounded w-full py-1 px-2 font-normal text-gray-700' {...register("starRating", {required: "This field is required"})}>
                        <option value="" disabled selected>Select a Rating</option>
                        <option value={1} className='text-sm font-bold'>1 star</option>
                        <option value={2} className='text-sm font-bold'>2 stars</option>
                        <option value={3} className='text-sm font-bold'>3 stars</option>
                        <option value={4} className='text-sm font-bold'>4 stars</option>
                        <option value={5} className='text-sm font-bold'>5 stars</option>
                    </select>
                    {errors.starRating ? (<p className='text-red-500 text-sm font-bold'>{errors.starRating.message}</p>):(<></>)}
                </label>
            </div>
        </div>
    </div>
  )
}

export default DetailsSection