import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, XCircleIcon } from '@heroicons/react/outline';
import { inputReplacer, lottieChecker } from '../../helpers/GenericHelpers';
import Login from '../Auth/Login';
import PopUp from '../PopUps/PopUp';
import { useRouter } from 'next/router';
import uuid from 'react-uuid';
import { callPostLottieApi } from '../../helpers/ApiHelpers';

/*
  Description: Component for uploading lotties to the database, this component
               also validates lottie for correct format.
  Depndenciess: None other NextJs hooks.
  Priority: High
*/

const Upload = ({isDialogOpened, handleCloseDialog}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpData, setPopUpData] = useState("");
  const [userData, setUserData] = useState({});
  const [fileData, setFileData] = useState();
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const [tags, setTags] = useState([]);
  const [isLottieSubmitted, setLottieSubmitted] = useState(false);
  const router = useRouter();
  
  const handleClose = () => {
    handleCloseDialog(false);
  };

  useEffect(() => {
    if(fileData && Object.keys(userData).length !== 0 && isLottieSubmitted) {
      var payLoad = {
        userData: userData,
        fileData: fileData,
        tagsData: tags
      }
      callPostLottieApi(payLoad).then(() => {
        handleClose();
        router.push({ pathname: '/dashboard', query: 'lottieUploaded'});
      })
    } else if(fileData && isLottieSubmitted) {
      var payLoad = {
        userData: {
          email: user
        },
        fileData: fileData,
        tagsData: tags
      }
      callPostLottieApi(payLoad).then(() => {
        handleClose();
        router.push({ pathname: '/dashboard', query: 'lottieUploaded'});
      })
    }
  }, [userData, fileData, isLottieSubmitted])
  
  const onFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    const oldInput = document.getElementById('uploadFile');
    if(uploadedFile.type != 'application/json') {
      setPopUpData('File Uploaded is not a JSON');
      setIsPopUpOpen(true);
      handleClose();
    } else {
      await lottieChecker(uploadedFile).then((checkResult) => {
        if(checkResult[0]) {
          setFileData(checkResult[1])
          if(user == null) {
            setIsOpen(true);
          }
        } else {
          setPopUpData('File Uploaded is not a valid Lottie File');
          setIsPopUpOpen(true);
          inputReplacer(oldInput);
          handleClose();
        }
      })
    }
  }

  const uploadTag = (event) => {
    if(event.key === 'Enter') {
      let tag = event.target.value;
      setTags(tags => [...tags, tag]);
      event.target.value = "";
    }
  }

  const removeTag = (index) => {
    setTags([
      ...tags.slice(0, index),
      ...tags.slice(index+1)
    ])
  }

  return (
    <Transition.Root show={isDialogOpened} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={handleClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={handleClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div id="aman" className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">Upload your lottie here !!</Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                          <div className="flex flex-col items-center mt-20">
                              <div className="flex">
                                <h1>Drag/drop your Lottie here or</h1>
                              </div>
                              <div>
                                <input id="uploadFile" onChange={onFileUpload} 
                                       className="w-64 border-2 border-black border-yellow-600 font-mono 
                                              font-bold hover:bg-yellow-500 rounded p-2" 
                                       type="file" placeholder="Browse"/>
                              </div>
                          </div>
                          <div className="flex flex-col justify-center mt-10">
                              <div className="flex flex-col ml-12 justify-center">
                                <input className="border-2 shadow-2xl rounded-xl w-4/5 p-3" onKeyDown={uploadTag} placeholder="Upload tags" />
                                <div className="flex flex-row mt-10  flex-wrap">
                                {
                                  tags.map((tag, index) => {
                                    return(
                                      <>
                                          <p key={uuid()} className="flex flex-row m-2 rounded-xl shadow-xl border-2 p-2">{tag}
                                            <span><XCircleIcon onClick={() => {removeTag(index)}} className="h-4 w-4 mt-1 ml-2" aria-hidden="true" /></span>
                                          </p>     
                                      </>
                                    )
                                  })
                                }
                                  </div>
                              </div>
                              
                              <div className="flex flex-row justify-center mt-10">
                                <button className="w-64 border-2 border-black border-yellow-600 font-mono 
                                                  font-bold hover:bg-yellow-500 rounded p-2" 
                                        onClick={() => {setLottieSubmitted(!isLottieSubmitted)}}>Submit</button>
                              </div>
                              
                          </div>
                      </div>
                    </div>
                    <Login 
                      isLoginDialogOpened={isOpen}
                      handleCloseLoginDialog={() => setIsOpen(false)}
                      userData={(userD) => setUserData(userD)}
                    />
                    <PopUp 
                      isPopUpOpened={isPopUpOpen} 
                      handleClosePopUp={() => setIsPopUpOpen(!isPopUpOpen)}
                      popUpData={popUpData}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Upload;