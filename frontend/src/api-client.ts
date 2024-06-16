// Where we put all our fetch requests, do this to make code cleaner. It's like how we put redux query stuff in a different location (kinda have to)
import {RegisterFormData} from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // the way you would use .env file in vite

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