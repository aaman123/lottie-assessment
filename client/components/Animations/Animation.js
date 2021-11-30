import doggo from '../../public/animations/doggo';
import yoga from '../../public/animations/yoga';
import banner from '../../public/animations/lottie-banner';

/*
    Description: Animation Options for Lottie Player.
*/

const animationOptionsDoggo = {
    loop: true,
    autoplay: true,
    animationData: doggo,
    rendererSettings: {
        preserverAspectRatio: "xMidYMid slice"
    }
};

const animationOptionsYoga = {
    loop: true,
    autoplay: true,
    animationData: yoga,
    rendererSettings: {
        preserverAspectRatio: "xMidYMid slice"
    }
};

const animationOptionsBanner = {
    loop: false,
    autoplay: true,
    animationData: banner,
    rendererSettings: {
        preserverAspectRatio: "xMidYMid slice"
    }    
}

export {
    animationOptionsDoggo,
    animationOptionsYoga,
    animationOptionsBanner
}