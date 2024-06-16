import React from 'react'
import { Footer, Header, Hero } from '../components'

interface Props {
    children: React.ReactNode;
}

function Layout({children}: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <Hero/>
        <div className='container mx-auto py-10 flex-1'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

// flex-1 makes it so the div takes up the available space

export default Layout