import { type FC, type MouseEvent, useState } from 'react';

import Button from './Button';
import { IconSettings } from './icons';

type Option = {
    icon: JSX.Element;
    text: string;
};

type DropdownProps = {
    className?: string;
    options: Option[];
    onSelect: (index: number) => void;
};

const Dropdown: FC<DropdownProps> = ({ options, onSelect, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (e: MouseEvent<HTMLLIElement>, index: number) => {
        e.preventDefault();
        onSelect(index);
        setIsOpen(false);
    };

    return (
        <div className={className}>
            <div className="relative">
                <Button
                    variant="pure"
                    size="lg"
                    icon={<IconSettings />}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                    <ul className="absolute left-0 top-0 translate-y-7 rounded-2xl border bg-white py-2 px-2">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="flex cursor-pointer items-center rounded-xl py-2 px-2 hover:bg-gray-100"
                                onClick={e => handleSelect(e, index)}
                            >
                                {option.icon}
                                <p className="whitespace-nowrap pl-3 text-sm">
                                    {option.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
