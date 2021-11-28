import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LoginIcon } from '@heroicons/react/outline';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { SketchPicker } from 'react-color'


const ViewLottie = ({isLottieDialogOpened, handleCloseLottieDialog, lottieData}) => {
    const cancelButtonRef = useRef(null)
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState();

    const handleClose = () => {
        handleCloseLottieDialog(false);
        // setColor('#fffff')
    };

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    }

    const handlePickerClose = () => {
        setDisplayColorPicker(false)
      };
    
    const handleChange = (color) => {
        setColor(color.hex)
    };
    console.log(lottieData);
    const onLayerSelect = (event) => {
        event.preventDefault();

        console.log(event.target.value);
    }
    return (
        <Transition.Root show={isLottieDialogOpened} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={handleClose}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
    
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom overflow-scroll bg-white rounded-lg text-left 
                                overflow-hidden shadow-xl transform transition-all sm:my-8 
                                sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center 
                                      h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <LoginIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          Edit Your Lottie
                        </Dialog.Title>
                        <div className="mt-10">
                        <Player
                            autoplay
                            loop
                            src={lottieData}
                            style={{ height: '300px', width: '300px' }}
                            background={color}
                            >
                            <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                        </Player>  
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 flex flex-col justify-center mb-20">
                        <div className="flex justify-center">
                            <p className="mr-4 font-mono font-black">Change Background Color: </p>
                            <div className="swatch"  onClick={handleClick}>
                                <div className="color" style={{background: color}}  />
                            </div>
                            { displayColorPicker ? 
                                <div className="popover">
                                    <div className="cover " onClick={handlePickerClose}/>
                                    <SketchPicker color={color} onChange={handleChange} />
                                </div> 
                                : 
                                null 
                            }
                        </div>
                        <div className="flex justify-center">
                            <p>Your lottie layers</p>
                            <select onChange={onLayerSelect}>
                                {
                                    lottieData != undefined ?  
                                    lottieData.layers.map((name, i) => {        
                                        console.log(name.nm);
                                        return(
                                            <option key={i}>{name.nm}</option>   
                                        )         
                                    })
                                    :
                                    null                               
                                }
                            </select>
                        </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
    )
};

export default ViewLottie;