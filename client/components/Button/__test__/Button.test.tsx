import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from '@components/Button';
import Icon from '@icons';

describe('Button component', () => {
    it('renders a button with text', () => {
        const { getByText } = render(<Button>Click me!</Button>);
        expect(getByText('Click me!')).toBeInTheDocument();
    });

    it('renders a button with an icon', () => {
        const { getByTestId } = render(
            <Button icon={<Icon name="Image" />}>Click me!</Button>
        );
        expect(getByTestId('icon')).toBeInTheDocument();
    });

    it('renders a disabled button', () => {
        const { getByText } = render(<Button disabled>Click me!</Button>);
        expect(getByText('Click me!')).toBeDisabled();
    });

    it('renders a link with text and href', () => {
        const { getByText } = render(<Button href="/about">About</Button>);
        expect(getByText('About')).toHaveAttribute('href', '/about');
    });

    it('calls a function when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>Click me!</Button>
        );
        fireEvent.click(getByText('Click me!'));
        expect(handleClick).toHaveBeenCalled();
    });

    it('shows spinner when isLoading prop is true', () => {
        const { getByTestId } = render(
            <Button isLoading>Loading button</Button>
        );
        expect(getByTestId('spinner')).toBeInTheDocument();
    });
});
