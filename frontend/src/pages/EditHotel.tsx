import { ManageHotelForm } from '../components'
import { useMutation, useQuery } from 'react-query'
import { useAppContext } from '../../contexts/AppContext'
import * as apiClient from "../api-client"
import { useParams } from 'react-router-dom'

function EditHotel() {
    const {hotelId} = useParams();
    const {showToast} = useAppContext();
    const {data: hotel} = useQuery("fetchMyHotelById", () => apiClient.fetchHotelById(hotelId || ""), {
        enabled: !!hotelId // this query only runs if there is a hotelId, !! checks for a value, returns true if there is
    }) 
    const {mutate, isLoading} = useMutation(apiClient.editMyHotel, {
        onSuccess: () => {
        showToast({
            message: "Hotel edited successfully",
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
        hotelFormData.append("id", hotelId!);
        mutate(hotelFormData);
    }

    return (
        <div>
            <ManageHotelForm hotel={hotel!} onSave={handleSave} isLoading={isLoading}/>
        </div>
    )
}

export default EditHotel