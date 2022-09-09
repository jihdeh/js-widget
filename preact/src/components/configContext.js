import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';
import { AppConfigurations } from '../models';

const initialState = {
  contents: '',
};
const Theme = createContext(initialState);
const Config = createContext(AppConfigurations);

const ConfigProvider = (props) => {
  const updateState = (newUpdate) => {
    setState((prev) => ({ ...prev, ...newUpdate }));
  };

  const updateContentState = (result) => {
    setState((prev) => ({
      ...prev,
      contents: result.contents,
    }));
  };

  const [state, setState] = useState({
    ...initialState,
    updateState,
    updateContentState,
  });

  return (
    <Theme.Provider value={state}>
      <Config.Provider value={props.config}>{props.children}</Config.Provider>
    </Theme.Provider>
  );
};

export { Theme, Config };

export default ConfigProvider;
