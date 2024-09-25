import { type FC, type MouseEvent, useMemo, useRef, useState } from 'react';

import cn from 'classnames';

import { useOnClickOutside } from '@hooks';
import Icon from '@icons';

import Button from './Button';

type DropdownOption = {
    icon: JSX.Element;
    text?: string;
    tooltip?: string;
    confirm?: boolean;
};

type OptionProps = {
    values: DropdownOption;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export type DropdownProps = {
    idx?: number;
    className?: string;
    options: DropdownOption[];
    vertical?: boolean;
    onSelect: (index: number, idx?: number) => void;
};

const Option: FC<OptionProps> = ({
    values: { icon, text, tooltip },
    onClick,
}) => (
    <>
        <Button
            className="border-white hover:bg-slate-600 hover:text-white"
            variant="custom"
            shape="square"
            justify="left"
            fullWidth
            tooltip={tooltip}
            onClick={onClick}
        >
            {icon}
            {text && <p className="whitespace-nowrap pl-3 text-xs">{text}</p>}
        </Button>
    </>
);

const Dropdown: FC<DropdownProps> = ({
    idx,
    options,
    onSelect,
    className,
    vertical,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (
        e: MouseEvent<HTMLButtonElement>,
        index: number,
        toConfirm?: boolean
    ) => {
        e.preventDefault();
        if (toConfirm && selectedIndex === -1) {
            setSelectedIndex(index);
        } else {
            onSelect(index, idx);
            setIsOpen(false);
        }
    };

    const handleClick = () => {
        if (selectedIndex !== 1) setSelectedIndex(-1);
        setIsOpen(s => !s);
    };

    useOnClickOutside(dropdownRef, handleClick, isOpen);

    const confirmMenu: DropdownOption[] = useMemo(
        () => [
            {
                icon: <Icon name="Check" className="h-4" />,
                tooltip: 'Confirm',
            },
            {
                icon: <Icon name="Clear" className="h-4" />,
                tooltip: 'Cancel',
            },
        ],
        []
    );

    const handleConfirmation = useMemo(
        () => (clickedOption: number) => {
            const action = {
                0: () => {
                    onSelect(selectedIndex, idx);
                    setSelectedIndex(-1);
                    setIsOpen(false);
                },
                1: () => {
                    setSelectedIndex(-1);
                },
            }[clickedOption];
            action?.();
        },
        [selectedIndex]
    );

    return (
        <div className={className} aria-hidden={!isOpen}>
            <div className="relative">
                <Button
                    variant="pure"
                    shape="square"
                    icon={<Icon name="Settings" className="h-4" />}
                    onClick={handleClick}
                />
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className={cn(
                            'absolute -right-1 -top-1.5 z-50 flex gap-1 rounded-xl bg-white p-1 shadow-card',
                            vertical && 'flex-col border'
                        )}
                    >
                        {selectedIndex === -1 ? (
                            options.map((option, index) => (
                                <Option
                                    key={index}
                                    values={option}
                                    onClick={e =>
                                        handleSelect(e, index, option.confirm)
                                    }
                                />
                            ))
                        ) : (
                            <>
                                <div className="m-1 flex items-center rounded-md bg-red-100 p-1 text-red-600">
                                    {options[selectedIndex].icon}
                                </div>
                                {confirmMenu.map((option, index) => (
                                    <Option
                                        key={index}
                                        values={option}
                                        onClick={() =>
                                            handleConfirmation(index)
                                        }
                                    />
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
