import { hotelTypes } from '../../../config/hotel-options-config'
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from '../ManageHotelForm';

function TypeSection() {
    const {register,formState:{errors},watch} = useFormContext<HotelFormData>();
    const typeWatch = watch("type");
  return (
        <div className='flex flex-col gap-4 px-10'>
            <h2 className='text-2xl font-bold mb-3'>Type</h2>
            <div className='grid grid-cols-5 gap-2'>
                {hotelTypes.map((type: string, i: number) => {
                    return ( 
                        <label key={i} className={
                            typeWatch === type ? "cursor-pointer text-sm rounded-full px-4 py-2 font-semibold bg-blue-300":"cursor-pointer text-sm rounded-full px-4 py-2 font-semibold bg-gray-300"
                        }>
                            <input type="radio" className='hidden'  value={type} {...register("type", { required: "This field is required" })}/>
                            <span className=''>{type}</span>      
                        </label>
                    );
                })}
            </div>
            {errors.type ? (<p className='text-red-500 text-sm font-bold'>{errors.type.message}</p>):(<></>)}
        </div>
    )

}

export default TypeSection