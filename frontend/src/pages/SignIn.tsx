import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as apiClient from '../api-client';
import { useAppContext } from '../../contexts/AppContext';

export type SignInFormData = {
    email: string,
    password: string,
}

// note: good to style based on mobile first
// md refers to screen size, md refers to medium screen
// default would be flex-col

function SignIn() {
    const queryClient = useQueryClient();

    const {showToast} = useAppContext(); // ctrl space inside the spaces to show all the available properties

    const navigate = useNavigate();

    const { register,handleSubmit, formState: { errors } } = useForm<SignInFormData>()

    // use react query here since states are built in
    const mutation = useMutation(apiClient.login, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // so we don't need to reload the page to validate the token
            showToast({
                message: "Sign in Successful!",
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
        <h2 className='text-3xl font-bold'>Sign In</h2>
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
        <div className='flex flex-col md:flex-row gap-5 justify-between'>
            <p className='text-gray-700 text-sm'>Don't have an account? <Link to="/register"><span className='underline hover:decoration-indigo-500 transition ease-in-out'>Create one here</span></Link></p>
            <span className='flex space-x-2 py-2 px-4'>
                <button type="submit" className='text-2xl flex items-center bg-blue-600 text-white px-4 py-2 font-bold hover:bg-blue-500 transition ease-in-out'>Sign In</button>
            </span>
        </div>
    </form>
  )
}

export default SignIn