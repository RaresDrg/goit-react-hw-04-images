import '../index.css';
import { useEffect, useState } from 'react';
import imagesService from 'service/imagesService';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ErrorAlert from './ErrorAlert/ErrorAlert';

const App = () => {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    searchedQuery.length > 0 && getImages();
  }, [searchedQuery, page]);

  async function getImages() {
    try {
      setIsLoading(true);
      const data = await imagesService.retreiveImages(page, searchedQuery);

      if (data.hits.length === 0) {
        throw new Error(
          `We are sorry. There is no data for your searched term: "${searchedQuery}"`
        );
      }

      setImages(prev => [...prev, ...data.hits]);
      setTotalImages(data.totalHits);
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  const onFormSubmit = searchedTerm => {
    setSearchedQuery(searchedTerm);
    setPage(1);
    setImages([]);
    setTotalImages(0);
    setError(null);
  };

  const openModal = url => {
    setModalIsOpen(true);
    setImageUrl(url);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const checkLoadMore = () => {
    return totalImages - page * 12 > 0;
  };

  const onClickLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="App">
      <Searchbar onFormSubmit={onFormSubmit} />
      <section>
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}

        {isLoading && <Loader />}

        {error && <ErrorAlert error={error} />}

        {checkLoadMore() && <Button handleLoadMore={onClickLoadMore} />}
      </section>

      {modalIsOpen && <Modal url={imageUrl} closeModal={closeModal} />}
    </div>
  );
};

export default App;
