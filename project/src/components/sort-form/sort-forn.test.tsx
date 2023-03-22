import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import SortForm from './sort-form';

describe('Sorting form:', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <SortForm />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
});
