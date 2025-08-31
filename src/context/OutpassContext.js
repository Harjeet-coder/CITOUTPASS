// src/context/OutpassContext.js
import React, { createContext, useContext, useState } from 'react';

const OutpassContext = createContext();

export const useOutpass = () => useContext(OutpassContext);

export const OutpassProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const addRequest = (request) => {
    setRequests((prevRequests) => [...prevRequests, request]);
  };

  const updateRequestStatus = (id, status, nextApprover = null) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id
          ? { ...req, status, nextApprover }
          : req
      )
    );
  };

  return (
    <OutpassContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
      {children}
    </OutpassContext.Provider>
  );
};
