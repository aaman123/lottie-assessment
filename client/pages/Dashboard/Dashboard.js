import { useState } from 'react';
import Lottie from 'react-lottie';
import { animationOptionsDoggo, animationOptionsYoga } from '../../components/Animations/Animation';
import Upload from '../../components/Upload/Upload';    

const Home = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
            <div class="container">
                <div class="w-full xl:w-full h-24 shadow-xl pt-4 flex flex-column justify-between">
                    <p class="ml-2 xl:ml-18 pt-3 mt-2 font-serif font-black text-xl flex-grow-0">Lottie 101</p>
                    <div class="invisible xl:visible order-2 xl:mr-9 mt-3 w-1/4">
                        <ul class="flex flex-column justify-between">
                            <li class="mt-2 font-serif font-black">Sign Up</li>
                            <li class="mt-2 font-serif font-black">Sign In</li>
                            <input class="border-2 border-black rounded p-2 shadow-xl " type="search" placeholder="Search for an animation" />
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col xl:flex-row">
                    <div class="absolute ml-60 mt-3 transform translate-x-18 rotate-6">
                        <Lottie 
                            options={animationOptionsDoggo}
                            height={150}
                            width={150}
                        />
                    </div>
                   
                    <div class="w-full xl:w-2/4 h-72 xl:transform xl:translate-x-48 xl:rotate-6 shadow-2xl flex rounded-xl justify-center
                                mt-40 ml-4 xl:ml-10 items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 
                                md:bg-gradien-to-y">
                        <p class="font-mono text-lg xl:text-6xl pl-10 pr-10">Welcome to the &nbsp; world of Lottie!!</p>
                    </div>

                    <div class="w-full xl:w-2/6 h-72 xl:transform xl:translate-y-58 xl:rotate-6 shadow-2xl flex rounded-xl justify-center
                                mt-20 ml-4 xl:ml-10 items-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 
                                md:bg-gradien-to-y">
                        <p class="font-mono text-lg xl:text-6xl pl-10 pr-10">Upload your first animation</p>
                    </div>

                    <div class="absolute object-right-bottom right-60 bottom-20 transform translate-x-18">
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

                <div class="flex justify-center mt-20 pt-4">
                    <button 
                        onClick={() => handleOpen()} 
                        class="w-64 border-2 border-black border-yellow-600 font-mono 
                               font-bold hover:bg-yellow-500 rounded p-2">
                        Upload
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;