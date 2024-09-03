import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'

const PopUp = (data) => {
    const [show, setShow] = useState(true);


    setTimeout(() => {
        setShow(false);
        console.log("i am out")
    }, 1000);

    // const func = () => {
    //     setShow(!show)
    // }

    return (
        <div>
            {/* <button onClick={func}>Click me</button> */}
            {show &&
                <div className='absolute w-3/4 sm:w-2/5 right-4 md:right-20 top-7 mx-auto sm:top-12'>
                    <div className='h-12 sm:h-16 bg-white w-3/4 sm:w-2/5 fixed flex flex-wrap justify-center items-center rounded-2xl border-2 border-[rgb(170,172,173)] shadow-2xl shadow-[rgb(60,61,151)] mx-auto transition-transform duration-300'>
                        <CheckCircleIcon className='h-7 w-7 mr-2 text-[rgb(66,178,248)]'></CheckCircleIcon>
                        {data.title}
                    </div>
                </div>
            }
        </div>
    )
}

export default PopUp
