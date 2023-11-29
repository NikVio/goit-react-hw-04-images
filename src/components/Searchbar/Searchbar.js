import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarBox,
  SearchbarButton,
  SearchbarForm,
  SearchbarInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [valForm, setValForm] = useState('');

  const handleChange = evt => {
    setValForm(evt.target.value);
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    onSubmit(valForm);
    setValForm('');
  };

  return (
    <SearchbarBox>
      <SearchbarForm onSubmit={handleFormSubmit}>
        <SearchbarButton type="submit">
          <BsSearch size={25} />
        </SearchbarButton>

        <SearchbarInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={valForm}
        />
      </SearchbarForm>
    </SearchbarBox>
  );
};
