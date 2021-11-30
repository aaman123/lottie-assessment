import { ArrowCircleLeftIcon }from '@heroicons/react/outline';
import React, { useRef, useState } from "react";
import { useRouter } from 'next/router';
import rgbHex from 'rgb-hex';
import uuid from 'react-uuid';
import { useLottieData } from '../../context/useLottieContext';

/*
    Description: Editing page for a Lottie
    Dependencies: Use context for fetching lottie to be edited
    Priority: High
*/

const LottieEditor = () => {
    const ref = useRef(null);
    const { lottieData } = useLottieData();
    const router = useRouter();
    const jsonDetails = {};

    React.useEffect(() => {
      import("@lottiefiles/lottie-player");
    });
    const [hexColors, setHexColors] = useState([]);
    const [layerDetails, setLayerDetails] = useState({});

    if(lottieData != null || undefined) {
        jsonDetails = {
            "v": lottieData.v,
            "fr": lottieData.fr,
            "ip": lottieData.ip,
            "op": lottieData.op,
            "w": lottieData.w,
            "h": lottieData.h,
            "nm": lottieData.nm,
            "ddd": lottieData.ddd,
            "assets": [],
            "layers": []
        }       
    }

    const handleColors = (layer) => {
        const details = {grIndex:[], innerIndex:[], color:[]};
        const rgbColors = [];
        const hexxColors = [];
        details['name'] = layer.nm;
        layer.shapes.forEach((shape, index) => {
            if(shape.ty == 'gr') {
                details['grIndex'].push(index)
                shape.it.forEach((color, index) => {
                    if(color.ty == 'fl' || color.ty == 'st') {
                        details['innerIndex'].push(index);
                        details['color'].push(color.c.k)
                        rgbColors.push(color.c.k);
                    }
                })
            }
        })

        rgbColors.forEach((c) => {
            hexxColors.push((rgbHex(c[0]*255, c[1]*255, c[2]*255)));
        })
        setHexColors([...hexxColors]);
        setLayerDetails(details);
    }

    return(
        <div className="relative bg-gray-900 overflow-y-hidden">
            <div className="w-full bg-gray-600 h-12 p-2 flex flex-row items-center fixed z-20">
                <span><ArrowCircleLeftIcon onClick={() => { router.push('/dashboard') }} 
                      className="h-6 w-6 text-white hover:text-green-600" aria-hidden="true" />
                </span>
                <h1 className="font-lf-bold p-1 px-3 text-base text-white">Lottie 101</h1>
            </div>
            <div>
                <div className="md:flex relative">
                    <div className="bg-lf-grey-dark w-1/4 h-screen overflow-y-scroll pt-20 max">
                        <div className="form-item flex flex-col">
                            <label className="block uppercase tracking-wide text-white text-xs opacity-50 font-lf-bold mb-2 px-4">Layers</label>
                            <div className="relative">
                                {
                                    lottieData != null || undefined ?
                                        lottieData.layers.map((l, index) => {
                                            jsonDetails['layers'].pop();
                                            jsonDetails['layers'].push(l);
                                            return(
                                                <div key={uuid()} onClick={() => {handleColors(lottieData['layers'][index])}}>
                                                    <div className="p-2 pl-4 mt-4 cursor-pointer items-center hover:bg-green-600 flex flex-row">
                                                        <div className="w-12 h-12 rounded" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                                                            <div>
                                                            <lottie-player
                                                                id="firstLottie"
                                                                ref={ref}
                                                                className="w-full h-12"
                                                                autoplay
                                                                loop
                                                                mode="normal"
                                                                src={JSON.stringify(jsonDetails)}
                                                                style={{ overflow: 'hidden' ,margin: '0px auto', width: '50px', height: '50px' }}
                                                            ></lottie-player>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-white pl-3">{l.nm}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    : null     
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bg-lf-grey flex flex-col items-center w-full justify-center overflow-hidden h-screen" style={{backgroundColor: "rgb(255, 255, 255)"}}>
                        <div className="mx-auto mt-auto mb-auto trans h-1/2 w-1/2">
                            <div className="lottie flex justify-center align-middle items-center">
                                <div className="w-auto w-full">
                                    <div>
                                        <lottie-player
                                           id="firstLottie"
                                           ref={ref}
                                           className="w-full h-12"
                                           autoplay
                                           controls
                                           loop
                                           mode="normal"
                                           src={JSON.stringify(lottieData)}
                                           style={{ overflow: 'hidden' ,margin: '0px auto' }}>
                                        </lottie-player>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-lf-grey-dark w-1/4 h-screen overflow-y-scroll pt-12 flex flex-col max">
                        <div className="p-4">
                            <div className="form-item flex flex-col">
                                <label className="block mt-4 uppercase tracking-wide text-white text-xs font-lf-bold opacity-50 mb-2">Colors</label>
                            </div>
                            <div className="relative flex flex-row flex-wrap -mx-4">
                                {
                                    hexColors.map((hexC, index) => {
                                        return(
                                        <div key={index} className="rounded mb-2 flex flex-row w-full px-4 mt-5">
                                            <div className="rounded flex flex-col py-1 w-full mr-2" style={{backgroundColor: `#${hexC}`}}>
                                                <div className="w-full hover:bg-blue-100">
                                                    <p className="w-full cursor-pointer p-2" style={{color: "white"}}>#{hexC}</p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LottieEditor;