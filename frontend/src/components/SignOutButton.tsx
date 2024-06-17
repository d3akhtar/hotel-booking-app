import { useAppContext } from '../../contexts/AppContext'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'


function SignOutButton() {
    const {showToast} = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // so we don't need to reload the page to validate the token
            showToast({
                message: "Signed out successfully",
                type: "SUCCESS"
            })
        },
        onError: (err: Error) => {
            showToast({
                message: err.message,
                type: "ERROR"
            })
        }
        })
        
        const onSignOut = () => {
        mutation.mutate()
        }

    return (
        <button className='flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100' onClick={onSignOut}>Sign Out</button>
    )
}

export default SignOutButton