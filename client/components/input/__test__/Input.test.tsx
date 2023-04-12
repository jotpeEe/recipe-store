import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input';
import MockedForm from './MockedForm';

import '@testing-library/jest-dom';

const submitForm = async () => {
    const input: HTMLInputElement = screen.getByLabelText('Test Input');
    const button = screen.getByText('Submit');

    expect(input).toHaveAttribute('aria-invalid', 'false');

    await userEvent.click(button);

    return input;
};

describe('Input', () => {
    it('renders input field', () => {
        render(
            <MockedForm>
                <Input name="test" label="Test Input" />
            </MockedForm>
        );
        const inputElement = screen.getByLabelText(/Test Input/i);

        expect(inputElement).toBeInTheDocument();
    });

    it('renders error message when input is required and no input is provided', async () => {
        render(
            <MockedForm>
                <Input name="test" label="Test Input" required />
            </MockedForm>
        );

        const inputElement = await submitForm();

        const error = await screen.findByText(/This field is required/i);
        expect(error).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not render error message when noValidation prop is passed', async () => {
        render(
            <MockedForm>
                <Input name="test" label="Test Input" noValidation />
            </MockedForm>
        );

        const inputElement = await submitForm();

        expect(
            screen.queryByText(/This field is required/i)
        ).not.toBeInTheDocument();
        expect(inputElement).toHaveAttribute('aria-invalid', 'false');
    });
});
