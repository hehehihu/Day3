import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login/Login';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  test('renders input fields and button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
  });

  test('shows error if username is empty', () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));
    expect(screen.getByText(/vui lòng nhập/i)).toBeInTheDocument();
  });
});
