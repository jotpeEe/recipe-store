import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Switch from '@components/Switch';

const options = ['Option 1', 'Option 2', 'Option 3'];

test('renders all the options passed as props', () => {
    const setActiveMock = jest.fn();
    const { getByText } = render(
        <Switch setActive={setActiveMock} active={2} array={options} />
    );

    options.forEach(option => {
        const element = getByText(option);
        expect(element).toBeInTheDocument();
    });
});

test('sets active option when clicked', () => {
    const setActiveMock = jest.fn();
    const { getByText } = render(
        <Switch array={options} setActive={setActiveMock} active={0} />
    );
    fireEvent.click(getByText(options[1]));
    expect(setActiveMock).toHaveBeenCalledWith(1);
});

test('applies correct className when fullWidth prop is set', () => {
    const setActiveMock = jest.fn();
    const { container } = render(
        <Switch
            setActive={setActiveMock}
            active={1}
            array={options}
            fullWidth
        />
    );
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('w-full');
});
