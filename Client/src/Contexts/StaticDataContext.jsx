import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios';

export const StaticDataContext = createContext(null);

export default function StaticDataContextProvider({children}) {

    const [static_data, setStaticData] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(null);
    const [increments, setIncrements] = useState(0);

    useEffect(() => {
        const interval = setInterval(() =>
          (async () => {
            try {
                let response = await axios.get('/api/static_data');
                let serverResponse = response?.data;
                if (serverResponse?.success) {
                    setStaticData(serverResponse.data);
                } else {
                    setStaticData(null);
                }
            } catch (e) {
                console.error('Failed getting Static Data', e.stack);
            }
        })()
        , 1000);
        return () => clearInterval(interval);
    }, [])

    // if nothing loaded, return loading title.
    if (!static_data) return <h1 className="static-loading">Loading...</h1>

    // Serve app with valid data
    return (
        <StaticDataContext.Provider value={{
            static_data
        }}>
            {children}
        </StaticDataContext.Provider>
    )
}
