import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import App from '../../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('Integration Test: Login to Account flow', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('Login form hiển thị, nhập form, submit, navigate sang /account và hiển thị thông tin', async () => {
    
    mock.onPost('https://dummyjson.com/auth/login').reply(200, {
      id: 1,
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      image: 'https://dummyjson.com/icon/emilys/128',
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
    });

    render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <App />
          </MemoryRouter>
        </Provider>
      );

    // 1. Check login form
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // 2. Nhập username + password
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'emilys' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'emilyspass' },
    });

    // 3. Submit form
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    // 4. Kiểm tra điều hướng & hiển thị thông tin account
    await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Thông tin tài khoản/i })).toBeInTheDocument();
      expect(screen.getByText(/emily.johnson@x.dummyjson.com/i)).toBeInTheDocument();
      expect(screen.getByText(/emilys/i)).toBeInTheDocument();
    });
  });
});
