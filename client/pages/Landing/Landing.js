import { useState } from 'react';
import Lottie from 'react-lottie';
import { animationOptionsDoggo, animationOptionsYoga } from '../../components/Animations/Animation';
import Upload from '../../components/Upload/Upload';    
import Navbar from '../../components/Layout/Navbar';

/*
    Description: Landing page
    Dependencies: None
    Priority: High
*/

const Landing = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
            <div className="container">
                <Navbar />
                <div className="flex flex-col xl:flex-row">
                    <div className="absolute ml-60 mt-3 transform translate-x-18 rotate-6">
                        <Lottie 
                            options={animationOptionsDoggo}
                            height={150}
                            width={150}
                        />
                    </div>
                   
                    <div className="w-full xl:w-2/4 h-72 xl:transform xl:translate-x-48 xl:rotate-6 shadow-2xl flex rounded-xl justify-center
                                mt-40 ml-4 xl:ml-10 items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 
                                md:bg-gradien-to-y">
                        <p className="font-mono text-lg xl:text-6xl pl-10 pr-10">Welcome to the &nbsp; world of Lottie!!</p>
                    </div>

                    <div className="w-full xl:w-2/6 h-72 xl:transform xl:translate-y-58 xl:rotate-6 shadow-2xl flex rounded-xl justify-center
                                mt-20 ml-4 xl:ml-10 items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 
                                md:bg-gradien-to-y">
                        <p className="font-mono text-lg xl:text-6xl pl-10 pr-10">Upload your first animation</p>
                    </div>

                    <div className="absolute object-right-bottom right-60 bottom-20 transform translate-x-18">
                        <Lottie 
                            options={animationOptionsYoga}
                            height={150}
                            width={150}
                        />
                    </div>
                    
                    <Upload  
                        isDialogOpened={isOpen}
                        handleCloseDialog={() => setIsOpen(false)}
                    />
                </div>

                <div className="flex justify-center mt-20 pt-4">
                    <button 
                        onClick={() => handleOpen()} 
                        className="w-64 border-2 border-black border-yellow-600 font-mono 
                               font-bold hover:bg-yellow-500 rounded p-2">
                        Upload
                    </button>
                </div>
            </div>
        </>
    )
}

export default Landing;