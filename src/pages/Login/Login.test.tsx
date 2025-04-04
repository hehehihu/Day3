import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login/Login';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ReactNode } from 'react';
import { message } from 'antd';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

const mock = new MockAdapter(axios);

const renderWithProviders = (component: ReactNode) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('TC01: Đăng nhập thành công', async () => {
    mock.onPost('https://dummyjson.com/auth/login').reply(200, {
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      image: 'https://dummyjson.com/icon/emilys/128',
      accessToken: 'token',
      refreshToken: 'refreshToken'
    });

    renderWithProviders(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'emilys' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'emilyspass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith('Login successful!');
      expect(mockedNavigate).toHaveBeenCalledWith('/account');
    });
  });

  test('TC02: Hiển thị lỗi nếu bỏ trống username', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'emilyspass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    expect(message.error).toHaveBeenCalledWith('Please fill in all fields.');
  });

  test('TC03: Hiển thị lỗi nếu bỏ trống password', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'emilys' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    expect(message.error).toHaveBeenCalledWith('Please fill in all fields.');
  });

  test('TC04: Hiển thị lỗi nếu cả hai trường trống', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    expect(message.error).toHaveBeenCalledWith('Please fill in all fields.');
  });

  test('TC05: Hiển thị lỗi nếu thông tin sai', async () => {
    mock.onPost('https://dummyjson.com/auth/login').reply(401);
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrong' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    await waitFor(() =>
      expect(message.error).toHaveBeenCalledWith('Login failed. Please try again.')
    );
  });

  test('TC06: Hiển thị lỗi nếu API lỗi mạng', async () => {
    mock.onPost('https://dummyjson.com/auth/login').networkError();
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'emilys' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'emilyspass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    await waitFor(() =>
      expect(message.error).toHaveBeenCalledWith('Login failed. Please try again.')
    );
  });
});
