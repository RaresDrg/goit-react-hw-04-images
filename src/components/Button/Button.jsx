import Proptypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ handleLoadMore }) => {
  return (
    <div className={styles['button-wrapper']}>
      <button className={styles.Button} onClick={handleLoadMore} type="button">
        Load more...
      </button>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: Proptypes.func.isRequired,
};

export default Button;
