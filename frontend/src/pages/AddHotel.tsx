import React from 'react'
import { ManageHotelForm } from '../components'
import { useMutation } from 'react-query'
import { useAppContext } from '../../contexts/AppContext'
import * as apiClient from "../api-client"

function AddHotel() {
  const {showToast} = useAppContext(); 
  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({
        message: "Hotel added successfully",
        type: "SUCCESS"
      })
    },
    onError: (e: Error) => {
      showToast({
        message: e.message,
        type: "ERROR"
      })
    }
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return (
    <div>
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default AddHotel