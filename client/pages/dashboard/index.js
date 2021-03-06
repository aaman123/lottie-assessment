import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Upload from '../../components/Upload/Upload';
import ViewLottie from "../../components/Layout/ViewLottie";
import uuid from 'react-uuid';
import { XCircleIcon } from '@heroicons/react/outline';
import { callGetLottieApi, callSearchLottieApi } from '../../helpers/ApiHelpers';

/*
    Description: Listing page for all the lottie's
    Dependencies: React-Lottie-player and Next Hooks.
    Priority: High
*/

const Dashboard = () => {
    
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    const router = useRouter();
    const query = router.query;
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(false);
    const [userData, setUserData] = useState({});
    const [animationData, setAnimationData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [viewLottie, setViewLottie] = useState(false);
    const [lottieData, setLottieData] = useState();
    const [searchData, clearSearchData] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleLottieOpen = (lottieData) => {
        setViewLottie(!viewLottie);
        setLottieData(lottieData);
    }

    useEffect(() => {
        callGetLottieApi(user).then((r) => {
            setUserData(r.data.user[0]);
            setAnimationData(r.data.animation);
        })
    }, [query, searchData])

    const searchLotties = (event) => {
        if(event.key == 'Enter') {
            const searchTerm = event.target.value;
            callSearchLottieApi(user, searchTerm).then((r) => {
                setAnimationData(r.data.animation)
                event.target.value = "";
            })
        } 
    }

    const handleLogOut = () => {
        localStorage.removeItem('user');
        router.push('/');
    }

    return (
        <>
            <div className="w-full h-full bg-gray-200">
                <div className="flex flex-no-wrap">
                    <div className="absolute lg:relative w-64 h-screen shadow bg-gray-100 hidden lg:block">
                        <div className="h-16 w-full flex items-center px-8">
                            <h1 className="font-mono font-weight-700 text-xl mt-3">Lottie 101</h1>
                        </div>
                        <ul aria-orientation="vertical" className=" py-6">
                            <li className="pl-6 cursor-pointer text-white text-sm leading-3
                                           tracking-normal pb-4 pt-5 text-yellow-700 
                                           focus:text-indigo-700 focus:outline-none">
                                <div className="flex items-center">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            className="icon icon-tabler icon-tabler-grid" width={20} height={20} 
                                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" 
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <rect x={4} y={4} width={6} height={6} rx={1} />
                                            <rect x={14} y={4} width={6} height={6} rx={1} />
                                            <rect x={4} y={14} width={6} height={6} rx={1} />
                                            <rect x={14} y={14} width={6} height={6} rx={1} />
                                        </svg>
                                    </div>
                                    <span className="ml-2 font-mono text-lg">Dashboard</span>
                                </div>
                            </li>
                            <li className="pl-6 cursor-pointer text-black text-sm leading-3 tracking-normal 
                                                       pb-4 pt-5 focus:outline-none">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 md:w-8 md:h-8">
                                        <button className="w-44 border-2 border-black border-yellow-600 font-mono 
                                                           font-bold hover:bg-yellow-500 rounded p-2"
                                                onClick={() => handleOpen()} >
                                            Upload Animation
                                        </button>
                                    </div>
                                </div>
                            </li>     
                        </ul>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    <div className={show ? "w-full h-full absolute z-40  transform  translate-x-0 " : "   w-full h-full absolute z-40  transform -translate-x-full"} 
                         id="mobile-nav">
                        <div className="bg-gray-800 opacity-50 absolute h-full 
                                        w-full lg:hidden" onClick={() => setShow(!show)} />
                        <div className="absolute z-40 sm:relative w-64 md:w-96 
                                        shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
                            <div className="flex flex-col justify-between h-full w-full">
                                <div>
                                    <div className="flex items-center justify-between px-8">
                                        <div className="h-16 w-full flex items-center">
                                            <h1 className="font-mono font-weight-700 text-xl mt-3">Lottie 101</h1>
                                        </div>
                                        <div id="closeSideBar" className="flex items-center justify-center h-10 w-10" onClick={() => setShow(!show)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                 className="icon icon-tabler icon-tabler-x" width={20} 
                                                 height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                                 fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                <line x1={6} y1={6} x2={18} y2={18} />
                                            </svg>
                                        </div>
                                    </div>
                                    <ul aria-orientation="vertical" className=" py-6">
                                        <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal 
                                                       pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 md:w-8 md:h-8">
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                         className="icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" 
                                                         strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" 
                                                         strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <rect x={4} y={4} width={6} height={6} rx={1} />
                                                        <rect x={14} y={4} width={6} height={6} rx={1} />
                                                        <rect x={4} y={14} width={6} height={6} rx={1} />
                                                        <rect x={14} y={14} width={6} height={6} rx={1} />
                                                    </svg>
                                                </div>
                                                <span className="ml-2 xl:text-base md:text-2xl text-base">Dashboard</span>
                                            </div>
                                        </li>       
                                    </ul>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-center mb-4 w-full px-6">
                                        <div className="relative w-full">
                                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    className="icon icon-tabler icon-tabler-search" width={16} 
                                                    height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" 
                                                    fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <circle cx={10} cy={10} r={7} />
                                                    <line x1={21} y1={21} x2={15} y2={15} />
                                                </svg>
                                            </div>
                                            <input className="bg-gray-200 focus:outline-none rounded 
                                            w-full text-sm text-gray-500  pl-10 py-2" type="text" placeholder="Search Animations" />
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-300">
                                        <div className="w-full flex items-center justify-between px-6 pt-1">
                                            <div className="flex items-center">
                                                <img alt="profile-pic" src="" 
                                                className="w-8 h-8 rounded-md" />
                                                <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">
                                                    {userData.username}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Mobile responsive sidebar*/}
                    {/* Sidebar ends */}
                    <div className="w-full">
                        {/* Navigation starts */}
                        <nav className="h-16 flex items-center lg:items-stretch 
                                        justify-end lg:justify-between bg-white 
                                        relative z-40">
                            <div className="hidden lg:flex w-full pr-6">
                                <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-5">
                                    <div className="relative w-full">
                                        <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                 className="icon icon-tabler icon-tabler-search" width={16} 
                                                 height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                                 fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <circle cx={10} cy={10} r={7} />
                                                <line x1={21} y1={21} x2={15} y2={15} />
                                            </svg>

                                        </div>                                       
                                        <input className="border border-gray-100 focus:outline-none 
                                                         focus:border-indigo-700 rounded w-full text-sm 
                                                         text-gray-500 bg-gray-100 pl-12 py-2" 
                                                type="text" 
                                                placeholder="Search Animations"
                                                onKeyDown={searchLotties}
                                                
                                        />
                                    </div>
                                </div>
                                <div onClick={() => {clearSearchData(!searchData)}} className="mt-5 mr-20">
                                    <XCircleIcon className="h-6 w-6 text-black hover:text-green-600" />    
                                </div>
                                <div className="w-1/2 hidden lg:flex">
                                    <div className="w-full flex items-center pl-8 justify-end">
                                        <div className="flex items-center relative cursor-pointer" 
                                             onClick={() => setProfile(!profile)}>
                                            <div className="rounded-full">
                                                {profile ? (
                                                    <ul className="p-2 w-full border-r bg-white 
                                                                   absolute rounded left-0 shadow 
                                                                   mt-12 sm:mt-16 ">
                                                        <li className="flex w-full justify-between text-gray-600 
                                                                       hover:text-indigo-700 cursor-pointer items-center mt-2">
                                                            <div className="flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                                     className="icon icon-tabler icon-tabler-logout" 
                                                                     width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" 
                                                                     stroke="currentColor" fill="none" strokeLinecap="round" 
                                                                     strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                                                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                                                </svg>
                                                                <span onClick={handleLogOut} className="text-sm ml-2">Sign out</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="relative">
                                                    <img className="rounded-full h-10 w-10 object-cover" 
                                                    src={userData.photoUrl} 
                                                    alt="avatar" />
                                                    <div className="w-2 h-2 rounded-full bg-green-400 
                                                    border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                                                </div>
                                            </div>
                                                <p className="text-gray-800 font-mono text-sm mx-3">{userData.username}</p>
                                            <div className="cursor-pointer text-gray-600">
                                                <svg aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" 
                                                     className="icon icon-tabler icon-tabler-chevron-down" width={20} 
                                                     height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-600 mr-8 visible lg:hidden relative" onClick={() => setShow(!show)}>
                                {show ? (
                                    " "
                                ) : (
                                    <svg aria-label="Main Menu" aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" 
                                        className="icon icon-tabler icon-tabler-menu cursor-pointer" width={30} height={30} 
                                        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" 
                                        strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                )}
                            </div>
                        </nav>

                        <div className="container w-full h-screen md:w-full w-11/12 px-6 pt-10 pb-20 ml-5 overflow-y-scroll">
                            <div className="w-full h-full rounded flex flex-row flex-wrap">
                                {   
                                    animationData.length != 0 ?
                                    animationData.map((lottie) => {
                                        return(    
                                            <div key={uuid()} className="w-80 h-2/4 border-2 ml-5 mt-5 rounded-xl shadow-2xl" onClick={() => handleLottieOpen(lottie.animationJson)}>
                                                <Player
                                                    autoplay
                                                    loop
                                                    src={lottie.animationJson}
                                                    style={{ height: '300px', width: '300px' }}
                                                    >
                                                    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                                </Player>
                                            </div>                      
                                        )
                                    }) : 
                                    <> 
                                    <div className="flex justify-center w-full h-full mt-20"> 
                                        <h1 className="font-mono text-2xl">Sorry, No Animations Found !!</h1> 
                                    </div> </>
                                }
                            </div>
                            <Upload  
                                isDialogOpened={isOpen}
                                handleCloseDialog={() => setIsOpen(false)}
                            />
                            <ViewLottie
                                isLottieDialogOpened={viewLottie}
                                handleCloseLottieDialog={() => setViewLottie(false)}
                                lottieData={lottieData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;