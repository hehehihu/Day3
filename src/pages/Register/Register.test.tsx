import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import authService from '../../services/authService';
import { message as AntMessage } from 'antd';

jest.mock('../../services/authService');
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    error: jest.fn(),
  },
}));

describe('Register Component', () => {
  const setup = () => {
    render(<Register />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('TC01: Đăng ký thành công', async () => {
    (authService.register as jest.Mock).mockResolvedValueOnce({ data: { id: 1 } });

    setup();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'valid@email.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Account created successfully/i)).toBeInTheDocument();
    });
  });

  test('TC02: Bỏ trống email', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  test('TC03: Email sai định dạng', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'abc@' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
    });
  });

  test('TC04: Password yếu', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalled(); 
    });
  });

  test('TC05: Cả hai trường trống', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  test('TC06: Email đã tồn tại', async () => {
    (authService.register as jest.Mock).mockRejectedValueOnce({ response: { status: 409 } });

    setup();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'tontai@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(AntMessage.error).toHaveBeenCalledWith(expect.stringMatching(/Failed to register/i));
    });
  });

  test('TC07: API lỗi', async () => {
    (authService.register as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    setup();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(AntMessage.error).toHaveBeenCalledWith(expect.stringMatching(/Failed to register/i));
    });
  });
});