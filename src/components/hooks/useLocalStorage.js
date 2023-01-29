import { useState, useEffect } from "react";

const useLocalStorage = ( key, defaultValue ) => {
  // в useState анонімна функція для того, щоб визкликати початковий стан компонента тільки 1 раз - при першому виклику функції 
  const [ state, setState ] = useState( () => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  });

  useEffect( () => {
    window.localStorage.setState(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
export default useLocalStorage;