
function Footer() {
  return (
    <div className='bg-blue-800 py-10'>
        <div className='container py-10 mx-auto flex justify-between items-center'>
            <h3 className='text-white text-3xl font-bold tracking-tight'>MernHolidays.com</h3>
            <span className='text-1xl text-white font-bold flex justify-between gap-4'>
                <p className='cursor-pointer'>Privacy Policy</p>
                <p className='cursor-pointer'>Terms of Service</p>
            </span>
        </div>
    </div>
  )
}

export default Footer