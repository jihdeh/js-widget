//service function companent to make use of hook to call api and pass to context
import { useContext, useEffect } from 'preact/hooks';
import { getContents } from '../services/apiClient';
import { Theme } from './configContext';

export default (props) => {
  const { updateContentState } = useContext(Theme);
  const { appId, onErrorOccured, onDataLoaded } = props;

  useEffect(() => {
    // Trigger your effect
    getContents(appId)
      .then((result) => {
        console.log(result.data);
        updateContentState({
          contents: result.data
        });
        onDataLoaded();
      })
      .catch(() => {
        /** display error boundary */
        onErrorOccured();
      });
    return () => {
      // Optional: Any cleanup code
    };
  }, [updateContentState, appId, onErrorOccured, onDataLoaded]);
  return null;
};
