import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [jsonData, setJsonData] = useState({});

    const updateJsonData = (newData) => {
        setJsonData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <DataContext.Provider value={{ jsonData, updateJsonData }}>
            {children}
        </DataContext.Provider>
    );
};
