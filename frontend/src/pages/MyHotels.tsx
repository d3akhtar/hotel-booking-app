import { Link } from 'react-router-dom'
import * as apiClient from "../api-client"
import { useQuery } from 'react-query'
import { useAppContext } from '../../contexts/AppContext'
import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'
import { HotelType } from '../../../backend/src/shared/types'

/* might use later 
hotel.facilities.reduce((acc,curr) => acc + ", " + curr
*/

function MyHotels() {
    const {showToast} = useAppContext()
    const {data: hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {
            showToast({
                message: "Error while fetching user hotels...",
                type: "ERROR"
            })
        }
    })
    
    if (!hotelData) {
        return <span className='font-bold text-2xl text-red-500'>No hotel data found!</span>
    }
    else{
        console.log(hotelData)
    }
    
    return (
        <div className='space-y-5'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>My Hotels</h2>
                <Link to="/add-hotel" className='px-5 py-3 bg-blue-600 text-white font-bold text-xl hover:bg-blue-500'>Add Hotel</Link>
            </div>
            <div className='grid grid-cols-1 gap-8'>
                {hotelData?.map((hotel: HotelType, i: number) => {
                    return (
                        <div className='flex flex-col p-8 border gap-5' key={i}>
                            <h2 className='font-bold text-xl'>{hotel.name || "[MISSING NAME]"}</h2>
                            <p className='whitespace-pre-line'>{hotel.description}</p>
                            <div className='flex flex-row gap-5'>
                                <div className='p-2 border flex-1 flex items-center gap-2'><BsMap/> {hotel.city}, {hotel.country}</div>
                                <div className='p-2 border flex-1 flex items-center gap-2'><BsBuilding/>{hotel.type}</div>
                                <div className='p-2 border flex-1 flex items-center gap-2'><BiMoney/>${hotel.pricePerNight} per night</div>
                                <div className='p-2 border flex-1 flex items-center gap-2'><BiHotel/>{hotel.adultCount} adults, {hotel.childCount} children</div>
                                <div className='p-2 border flex-1 flex items-center gap-2'><BiStar/>{hotel.starRating} Star rating</div>
                            </div>
                            <div className='flex justify-end'>
                                <Link to={`/edit-hotel/${hotel._id}`} className='px-3 py-2 bg-blue-600 text-white font-bold text-md hover:bg-blue-500'>View Details</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyHotels