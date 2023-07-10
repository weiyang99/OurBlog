"use client";

import Image from "next/image";

const UpArrow = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className='z-20 fixed bottom-6 right-6'>
            <Image
                src='/assets/icons/upArrow.svg'
                width={50}
                height={50}
                alt='loader'
                className='object-contain cursor-pointer'
                onClick={handleClick}
            />
        </div>
    );
};

export default UpArrow;