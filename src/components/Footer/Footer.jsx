import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-main-light  py-5 ">
            <div className="container mx-auto">
                <h4>Get the Fresh Cart App</h4>
                <p>We will send you a link, open it on your phone to download the app.</p>
                <div className="flex row gap-1 ">
                    <div className="w-3/4">
                        <input type="text" className="form-control py-2" placeholder="Email..." />
                    </div>
                    <div className="w-1/4">
                        <button type='submit' className="btn w-100 btn bg-main  rounded-md text-white bg-[#987070] hover:bg-[#F1E5D1] focus:ring-4 focus:outline-none focus:ring-[#C39898]-300 font-medium text-sm mt-2 px-5 py-2.5 text-center dark:bg-[#987070]
            dark:hover:bg-[#C39898] dark:focus:ring-[#C39898]">Share App Link</button>
                    </div>
                </div>

            </div>
        </footer>
    )
}