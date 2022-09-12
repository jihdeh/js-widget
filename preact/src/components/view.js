import { h, Fragment } from 'preact';
import { useContext } from 'preact/hooks';

import { Config, Theme } from './configContext';


import Modal from './modal';

const View = () => {
  const {
    contents,
  } = useContext(Theme);

  const { appId } = useContext(Config);
  console.log(contents)
  return (
    <Fragment>
      <iframe src="https://tall-tips-take-197-242-119-243.loca.lt/" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
      <Modal>
      </Modal>
    </Fragment>
  );
};

export default View;
