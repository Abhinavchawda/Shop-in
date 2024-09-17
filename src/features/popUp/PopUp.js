import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'

const PopUp = (data) => {
    const [show, setShow] = useState(true);

    setTimeout(() => {
        setShow(false);
    }, 1500);

    return (
        <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
            {show && (
                <div className="absolute bg-white rounded-xl p-4 md:px-8 text-center shadow-md text-indigo-700">
                    <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h2 className="text-lg font-semibold">{data.title}</h2>
                </div>
            )}
        </div>
    )
}

export default PopUp
