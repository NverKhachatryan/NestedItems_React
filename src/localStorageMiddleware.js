// localStorageMiddleware.js

export const localStorageMiddleware = (store) => (next) => (action) => {
    // Call the next middleware or the actual dispatch function
    const result = next(action);
  
    // Save the state to localStorage
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  
    return result;
  };
  