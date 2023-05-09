import classNames from 'classnames';

import Button from '../Button';

type SwitchProps<T extends number | string> = {
    options: T[];
    activeOption: T;
    onOptionChange: (option: T, group?: string) => void;
    label?: string;
    size?: 'sm' | 'md';
    withBorder?: boolean;
    fullWidth?: boolean;
};

const Switch = <T extends number | string>({
    label,
    options,
    onOptionChange,
    activeOption,
    size = 'md',
    withBorder,
    fullWidth,
}: SwitchProps<T>) => {
    const getButtonVariant = (option: T) => {
        if (option !== activeOption) {
            return withBorder ? 'pure-border' : 'pure';
        }
        return 'normal';
    };

    return (
        <ul
            className={classNames(
                'flex gap-2 rounded-2xl',
                fullWidth ? 'w-full' : 'w-fit'
            )}
        >
            {options &&
                options.map((option, index) => (
                    <li key={index} className="w-full">
                        <Button
                            key={index}
                            fullWidth
                            size={size}
                            className="self-center justify-self-end"
                            variant={getButtonVariant(option)}
                            onClick={
                                label
                                    ? () => onOptionChange(option, label)
                                    : () => onOptionChange(option)
                            }
                        >
                            {option}
                        </Button>
                    </li>
                ))}
        </ul>
    );
};

export default Switch;
