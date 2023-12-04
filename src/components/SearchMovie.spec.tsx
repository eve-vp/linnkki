import { render, fireEvent } from '@testing-library/react';
import SearchMovie from './SearchMovie';

describe('SearchMovie', () => {

  it('should update genre state when dropdown selection changes', () => {

    const onSearchMock = jest.fn();

    const { getByText, getByLabelText } = render(
      <SearchMovie onSearch={onSearchMock} />  
    );

    const selectElement = getByLabelText('Select a genre');

    // Select comedy genre
    fireEvent.change(selectElement, { target: { value: 'Comedy' } });
    expect(getByText('Comedy').selected).toBeTruthy();

    // Select drama genre
    fireEvent.change(selectElement, { target: { value: 'Drama' } });
    expect(getByText('Drama').selected).toBeTruthy();

  });

  it('should call onSearch when button is clicked', () => {

    // assertions here    

  });

});