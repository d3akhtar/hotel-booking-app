type ToastProps = {
    message: string
    type: "SUCCESS" | "ERROR"
    onClose: () => void
}

import React, { useEffect } from 'react'

function Toast({message, type, onClose}: ToastProps) {

    var timer : any; 
    useEffect(() => {
        timer = setTimeout(() => {
            onClose();
        }, 5000) // 5 seconds, when this time is up, the code will be run

        return ()=>{
            clearTimeout(timer); // resets timer whenever component closes, whenever the component opens again, it starts a new timer
        }
    }, [onClose]) // whenever onClose function gets set, timer goes down

    const styles = type === "SUCCESS" ?
    "fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-green-600 text-white max-w-md hover:bg-green-400 hover:cursor-pointer":
    "fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-red-600 text-white max-w-md hover:bg-red-400 hover:cursor-pointer"

  return (
    <div className={styles} onClick={() => {
        onClose();
        clearTimeout(timer);
    }}>
        <div className='flex justify-center items-center'>
            <span className='text-lg font-semibold'>{message}</span>
        </div>
    </div>
  )
}

export default Toast