import doggo from '../../public/animations/doggo';
import yoga from '../../public/animations/yoga';

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

export {
    animationOptionsDoggo,
    animationOptionsYoga
}