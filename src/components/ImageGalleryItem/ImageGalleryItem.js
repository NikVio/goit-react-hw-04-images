import { ImageModal } from 'components/Modal/Modal';
import { useState } from 'react';
import { Image, ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, tags, modalImage }) => {
  const [isModalOpen, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <ImageItem>
        <Image src={image} alt={tags} onClick={openModal} />
      </ImageItem>

      <ImageModal
        isOpen={isModalOpen}
        isClose={closeModal}
        tags={tags}
        modalImage={modalImage}
      />
    </>
  );
};
