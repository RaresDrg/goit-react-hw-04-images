import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ url, closeModal }) => {
  useEffect(() => {
    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };

    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.removeEventListener('keydown', addCloseEvent);
    };
  });

  const closeOnClickOutside = ({ target }) => {
    target.className === 'Overlay' && closeModal();
  };

  return (
    <div className="Overlay" onClick={closeOnClickOutside}>
      <div className="Modal">
        <img src={url} alt="your search" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
