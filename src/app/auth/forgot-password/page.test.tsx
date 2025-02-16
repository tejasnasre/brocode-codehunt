import { render, screen } from '@testing-library/react';
import ForgotPassword from './page';

test('renders forgot password page', () => {
	render(<ForgotPassword />);
	const linkElement = screen.getByText(/forgot password/i);
	expect(linkElement).toBeInTheDocument();
});