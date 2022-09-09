import { h } from 'preact';
import style from './style.css';

const Modal = ({ children }) => {
  return (
    <section>
      <div id="open-modal" class={style['modaloverlay']}>
        <div class={style.modal}>
          <a href="#close" title="Close" class={style['close']}>
            Close
          </a>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
