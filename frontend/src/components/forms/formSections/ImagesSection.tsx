import { useFormContext } from 'react-hook-form'
import { HotelFormData } from '../ManageHotelForm';

function ImagesSection() {
    const {register, formState:{errors}} = useFormContext<HotelFormData>();
  return (
    <div className='flex flex-col gap-1 px-10'>
        <h2 className='text-2xl font-bold mb-3'>Images</h2>
        <div className='px-8 py-6 border'>
            <input type="file" multiple accept="image" {...register("imageFiles", {
                validate: (imageFiles) => {
                    const totalLength = imageFiles.length;
                    if (totalLength === 0){
                        return "At least one image is required"
                    }
                    else if (totalLength > 6){
                        return "You cannot upload more than 6 images"
                    }
                    else {
                        return true;
                    }
                }
            })}></input>
        </div>
        {errors.imageFiles ? (<p className='text-red-500 text-sm font-bold'>{errors.imageFiles.message}</p>):(<></>)}
    </div>
  )
}

export default ImagesSection