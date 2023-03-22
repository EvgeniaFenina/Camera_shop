import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {makeFakeCamera} from '../../utils/mock';
import ProductTabs from './product-tabs';

const mockCamera = makeFakeCamera();

describe('Product tabs', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <ProductTabs product={mockCamera} />
        </BrowserRouter>
      </HelmetProvider>
    );
  });

  it('shouldn\'t have class "is-active" if type is not characteristic', async () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <ProductTabs product={mockCamera} />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.category)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.type)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.level)).toBeInTheDocument();
    expect(screen.getByTestId('characteristic-tab')).toHaveClass('is-active');

    await userEvent.click(screen.getByText('Характеристики'));

    expect(screen.getByTestId('characteristic-tab')).not.toHaveClass('is-active');
  });

  it('shouldn\'t have class "is-active" if type is not description', async () => {

    render(
      <HelmetProvider>
        <BrowserRouter>
          <ProductTabs product={mockCamera} />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(mockCamera.description)).toBeInTheDocument();
    expect(screen.getByTestId('description-tab')).not.toHaveClass('is-active');

    await userEvent.click(screen.getByText('Описание'));

    expect(screen.getByTestId('description-tab')).toHaveClass('is-active');
  });
});
