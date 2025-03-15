import { createContext } from "react";

export const addressContext=createContext();

export const AddressProvider=({children})=>{

    async function getAddressFromCoords(lat, lon) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await response.json();
            return data.display_name || "location is not fount";
        } catch (error) {
            console.error(error);
            return "Error fetching address";
        }
    }

    return(
        <addressContext.Provider value={{getAddressFromCoords}}>
            {children}
        </addressContext.Provider>
    )
}