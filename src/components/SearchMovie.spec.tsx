// import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import SearchMovie from './SearchMovie';

afterEach(cleanup); 


// Ignore React import warning
jest.mock('react', () => ({
  ...jest.requireActual('react'), 
  useState: jest.fn(),
  useEffect: jest.fn() 
}));

describe('<SearchMovie />', () => {
  it('renders select with genres', async () => {
    const onSearch = jest.fn();
    
    render(<SearchMovie onSearch={onSearch} />);
    
    expect(screen.getByLabelText('Select a genre')).toBeInTheDocument();
    
    // Wait for genres to load from API
    await screen.findByText('Action'); 
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
  
  it('calls onSearch when button is clicked', async () => {
    const onSearch = jest.fn();
    
    render(<SearchMovie onSearch={onSearch} />);
    
    // Select a genre
    fireEvent.change(screen.getByLabelText('Select a genre'), {
      target: { value: 'Comedy' }
    });
    
    // Click button
    fireEvent.click(screen.getByRole('button'));
    
    expect(onSearch).toHaveBeenCalledWith('Comedy');
  });
});