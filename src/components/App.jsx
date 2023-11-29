import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from './axios';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Searchbar } from './Searchbar/Searchbar';
import { FidgetSpinner } from 'react-loader-spinner';
import { Button } from './LoadMore/Button';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.styled';

export const App = () => {
  const [page, setPage] = useState(1);
  const [val, setVal] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    getImages(val, page);
  }, [val, page]);

  const getImages = async (query, page) => {
    try {
      setIsLoading(true);
      const { hits, totalHits } = await fetchImages(query, page);

      setImages(prevImages => {
        return [...prevImages, ...hits];
      });
      setTotal(totalHits);
    } catch (error) {
      toast.error('Oops, something went wrong, please try again later...');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = evt => {
    if (evt === '') {
      toast.error('The field must not be empty!🤦‍♂️');
      return;
    }
    setImages([]);
    setPage(1);
    setVal(evt);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {isLoading && (
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={['#ff0000', '#00ff00', '#0000ff']}
          backgroundColor="#F4442E"
        />
      )}
      {val && <ImageGallery images={images} />}
      {images.length && total > images.length && val !== '' && (
        <Button onClick={handleLoadMore} btnText="Load More" />
      )}

      <Toaster />
      <GlobalStyle />
    </Container>
  );
};
