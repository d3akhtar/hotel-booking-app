// Where we put all our fetch requests, do this to make code cleaner. It's like how we put redux query stuff in a different location (kinda have to)
import { HotelType } from "../../backend/src/shared/types";
import {RegisterFormData} from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; // the way you would use .env file in vite

export const register = async(formData:RegisterFormData) =>{
    const url = `${API_BASE_URL}/api/users/register`;
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include" // anytime we make a post request, we want to include http cookies with the request, and we also want to set any cookies we get back

    });
    
    const resultBody = await result.json();
    if (!result.ok){
        throw new Error(resultBody.message);
    }
    else{
        return resultBody;
    }
}

export const validateToken = async() => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validateToken`, {
        credentials: "include" // include the cookie
    });
    if (!response.ok){
        throw new Error("Token invalid")
    }
    return response.json();
}

export const login = async(formData:SignInFormData) => {
    const url = `${API_BASE_URL}/api/auth/login`;
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include" // anytime we make a post request, we want to include http cookies with the request, and we also want to set any cookies we get back

    });
    
    const resultBody = await result.json();
    if (!result.ok){
        throw new Error(resultBody.message);
    }
    else{
        return resultBody;
    }
}

export const signOut = async() => {
    const url = `${API_BASE_URL}/api/auth/sign-out`;
    const result = await fetch(url, {
        method: "POST",
        credentials: "include" // anytime we make a post request, we want to include http cookies with the request, and we also want to set any cookies we get back
    });
    if (!result.ok){
        throw new Error("Unknown error while signing out");
    }
}

export const addMyHotel = async(formData: FormData) => {
    const url = `${API_BASE_URL}/api/my-hotels/`;
    const result = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData
    })
    if (!result.ok){
        throw new Error("Error occured while adding hotel...")
    }
    else{
        return result.json();
    }
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const url = `${API_BASE_URL}/api/my-hotels/`;
    const response = await fetch(url, {
        credentials: "include"
    });
    if (!response.ok){
        throw new Error("Error while fetching hotels...")
    }
    else{
        return response.json()
    }
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const url = `${API_BASE_URL}/api/my-hotels/${hotelId}`;
    const response = await fetch(url, {
        credentials: "include"
    });
    if (!response.ok){
        throw new Error("Error while fetching hotel...")
    }
    else{
        return response.json()
    }
}

export const editMyHotel = async (formData: FormData) => {
    const url = `${API_BASE_URL}/api/my-hotels/${formData.get("id")}`;
    const response = await fetch(url, {
        credentials: "include",
        method: "PUT",
        body: formData
    });
    if (!response.ok){
        throw new Error("Error while editing hotel...")
    }
    else{
        return response.json()
    }
}