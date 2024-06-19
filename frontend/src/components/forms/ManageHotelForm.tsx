import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './formSections/DetailsSection';
import TypeSection from './formSections/TypeSection';
import FacilitiesSection from './formSections/FacilitiesSection';
import GuestsSection from './formSections/GuestsSection';
import ImagesSection from './formSections/ImagesSection';

export type HotelFormData = {
  name: string,
  city: string,
  country: string,
  description: string,
  type: string,
  pricePerNight: number,
  starRating: number,
  facilities: string[],
  imageFiles: FileList,
  adultCount: number,
  childCount: number,
}

type ManageHotelFormProps = {
  onSave: (hotelFormData : FormData) => void;
  isLoading: boolean
}


function ManageHotelForm({onSave, isLoading}: ManageHotelFormProps) {
  const formMethods = useForm<HotelFormData>(); // since we have broken our form up, we need to use a form provider
  const onSubmit = formMethods.handleSubmit((formData: HotelFormData) => {
    // create new FormData object
    console.log(formData)
    const bodyFormData = new FormData();
    
    bodyFormData.append("adultCount", formData.adultCount.toString())
    bodyFormData.append("childCount", formData.childCount.toString())
    bodyFormData.append("city", formData.city)
    bodyFormData.append("country", formData.country)
    bodyFormData.append("description", formData.description)
    bodyFormData.append("name", formData.name)
    bodyFormData.append("type", formData.type)
    bodyFormData.append("pricePerNight", formData.pricePerNight.toString())
    bodyFormData.append("starRating", formData.starRating.toString())
    
    formData.facilities.forEach((facility: string, index: number) => {
      bodyFormData.append(`facilities[${index}]`,facility)
    })
    Array.from(formData.imageFiles).forEach((imageFile : File) => {
      bodyFormData.append(`imageFiles`,imageFile) // multer takes array of imageFiles and processes them for us
    })

    onSave(bodyFormData)
  })

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={onSubmit}>
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestsSection/>
        <ImagesSection/>
        <span className='flex justify-end px-10'>
          <button type="submit" className='px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500' disabled={isLoading}>{isLoading ? "Saving":"Save"}</button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm