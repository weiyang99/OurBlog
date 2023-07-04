"use client";

import { motion } from "framer-motion";

const Mouse = () => {
    return (
        <div className='absolute xs:bottom-10 bottom-32 w-full flex_center z-10'>
            <div className='w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2 z-10'>
                <motion.div
                    animate={{
                        y: [0, 24, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    className='w-3 h-3 rounded-full bg-white mb-1 z-10'
                />
            </div>
        </div>
    )
}

export default Mouse