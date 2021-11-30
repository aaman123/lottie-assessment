const Navbar = () => {
    return(
        <div className="w-full xl:w-full h-24 shadow-xl pt-4 flex flex-column justify-between">
            <p className="ml-2 xl:ml-18 pt-3 mt-2 font-serif font-black text-xl flex-grow-0">Lottie 101</p>
            <div className="invisible xl:visible order-2 xl:pl-12 mt-3 w-1/4">
                <ul className="flex flex-column justify-between">
                    <input className="border-2 border-black rounded p-2 shadow-xl " type="search" placeholder="Search for an animation" />
                </ul>
            </div>
        </div>
    )
};

export default Navbar;