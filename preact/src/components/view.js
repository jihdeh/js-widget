import { Fragment } from 'preact';
import { useContext } from 'preact/hooks';

import { Config, Theme } from './configContext';


import Modal from './modal';

const View = () => {
  const {
    parts,
    selectedPartsForQuote,
    updateState,
    updatePartState,
    partsPagination,
    brand,
  } = useContext(Theme);

  const { appId } = useContext(Config);

  return (
    <Fragment>
      <Modal>
        <div>Hello</div>
      </Modal>
    </Fragment>
  );
};

export default View;
