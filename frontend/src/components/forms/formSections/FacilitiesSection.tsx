import { useFormContext } from 'react-hook-form';
import { HotelFormData } from '../ManageHotelForm';
import { hotelFacilities } from '../../../config/hotel-options-config';

function FacilitiesSection() {
    const {register,formState:{errors}} = useFormContext<HotelFormData>();
    return (
            <div className='flex flex-col gap-4 px-10'>
                <h2 className='text-2xl font-bold mb-3'>Facilities</h2>
                <div className='grid grid-cols-4 gap-2'>
                    {hotelFacilities.map((type: string, i:number) => {
                        return ( 
                            <label key={i}>
                                <input type="checkbox" value={type} {...register("facilities", { 
                                    validate: (facilities) => {
                                        if (!facilities || facilities.length == 0){
                                            return "At least one facility is required"
                                        }
                                        else{
                                            return true;
                                        }
                                    }
                                })}/>
                                <span className='ms-2'>{type}</span>      
                            </label>
                        );
                    })}
                </div>
                {errors.facilities ? (<p className='text-red-500 text-sm font-bold'>{errors.facilities.message}</p>):(<></>)}
            </div>
        )
}

export default FacilitiesSection