import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({ onFormSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const searchedTerm = form.search.value.trim();

    if (!searchedTerm) {
      alert('Please, write something !');
      return;
    }

    onFormSubmit(searchedTerm);
    form.reset();
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <BsSearch />
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
