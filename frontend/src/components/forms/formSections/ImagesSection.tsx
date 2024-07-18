import { useFormContext } from 'react-hook-form'
import { HotelFormData } from '../ManageHotelForm'

function ImagesSection() {
    const {register, formState:{errors}, watch, setValue} = useFormContext<HotelFormData>()
    const imageUrls = watch("imageUrls")

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, imageUrl: string) => {
        event.preventDefault()
        setValue("imageUrls", imageUrls!.filter((curr: string) => curr !== imageUrl))
    }

  return (
    <div className='flex flex-col gap-1 px-10'>
        <h2 className='text-2xl font-bold mb-3'>Images</h2>
        <div className='px-8 py-6 border'>
        {imageUrls && 
          <div className='grid grid-cols-6 gap-4 mb-5'>
            {
              imageUrls.map((url : string, i: number) => {
                return (
                    <div className='relative group'>
                        <img src={url} key={i} className='min-h-full object-cover'/> {/* object-cover makes sure overflowing doesn't happen */}
                        <button onClick={(e) => handleDelete(e, url)} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white font-bold'>Delete</button>
                        {/* absolute and inset-0 makes sure the button is positioned based on the closest element with class name of relative. 
                            group in this case would be referring to the last element with group class (i think), so if you hover over that element, this button will also get affected */}
                    </div>
                )
              })
            }
          </div>
        }
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