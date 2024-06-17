import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as apiClient from '../api-client';
import { useAppContext } from '../../contexts/AppContext';

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

// note: good to style based on mobile first
// md refers to screen size, md refers to medium screen
// default would be flex-col

function Register() {
    const queryClient = useQueryClient();
    
    const {showToast} = useAppContext(); // ctrl space inside the spaces to show all the available properties

    const navigate = useNavigate();

    const { register,watch,handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

    // use react query here since states are built in
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // so we don't need to reload the page to validate the token
            showToast({
                message: "You have successfully registered.",
                type: "SUCCESS"
            });
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            }); 
        }
    })
    
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold'>Create an Account</h2>
        <div className='flex flex-col md:flex-row gap-5'> 
            <label className='text-gray-700 text-sm font-bold flex-1'>
                First Name
                <input className='border rounded w-full py-1 px-2 font-normal' {...register("firstName", {required: "This field is required"})}></input>
                {errors.firstName ? (<p className='text-red-500 text-sm font-bold'>{errors.firstName.message}</p>):(<></>)}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Last Name
                <input className='border rounded w-full py-1 px-2 font-normal' {...register("lastName", {required: "This field is required"})}></input>
                {errors.lastName ? (<p className='text-red-500 text-sm font-bold'>{errors.lastName.message}</p>):(<></>)}
            </label>
        </div>
        <div className='flex flex-col md:flex-row gap-5'> 
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input className='border rounded w-full py-1 px-2 font-normal' {...register("email", {required: "This field is required"})}></input>
                {errors.email ? (<p className='text-red-500 text-sm font-bold'>{errors.email.message}</p>):(<></>)}
            </label>
        </div>
        <div className='flex flex-col md:flex-row gap-5'> 
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Password
                <input type="password" className='border rounded w-full py-1 px-2 font-normal' {...register("password", {required: "This field is required", minLength: {value:6, message: "Password must have 6 or more characters"}})}></input>
                {errors.password ? (<p className='text-red-500 text-sm font-bold'>{errors.password.message}</p>):(<></>)}
            </label>
        </div>
        <div className='flex flex-col md:flex-row gap-5'> 
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Confirm Password
                <input type="password" className='border rounded w-full py-1 px-2 font-normal' {...register("confirmPassword", {validate:(val : any) => {
                    if (!val){
                        return "This field is required"
                    }
                    else if (watch("password") != val){
                        return "Passwords don't match"
                    }
                }})}></input>
                {errors.confirmPassword ? (<p className='text-red-500 text-sm font-bold'>{errors.confirmPassword.message}</p>):(<></>)}
            </label>
        </div>
        <div className='flex flex-col md:flex-row gap-5 justify-between'>
            <p className='text-gray-700 text-sm'>Already Registered? <Link to="/sign-in"><span className='underline hover:decoration-indigo-500 transition ease-in-out'>Sign in here</span></Link></p>
            <span className='flex space-x-2 py-2 px-4'>
                <button type="submit" className='text-2xl flex items-center bg-blue-600 text-white px-4 py-2 font-bold hover:bg-blue-500 transition ease-in-out'>Create Account</button>
            </span>
        </div>
    </form>
  )
}

export default Register