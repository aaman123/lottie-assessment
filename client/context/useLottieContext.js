import { useState, useContext, createContext } from 'react';

export const LottieData = createContext();

export const LottieDataProvider = ({ children }) => {
    const [lottieData, setLottieData] = useState();

    return(
        <LottieData.Provider value={{lottieData, setLottieData}}>
            {' '}
            {children}{' '}
        </LottieData.Provider>
    );
};

export function useLottieData() {
    return useContext(LottieData)
}