import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const updateData = (newData) => {
        setData(newData);
        localStorage.setItem("user_info", JSON.stringify(newData));

    };

    return (
        <MyContext.Provider value={{ data, updateData }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);