import React, { type FC } from 'react';

const StepsHeader: FC<{ title: string; desc: string }> = ({ title, desc }) => {
    const MAX_CHAR = 20;

    const lastWord = desc.indexOf(' ', MAX_CHAR);
    const firstLine = desc.slice(0, lastWord);
    const secondLine = desc.slice(lastWord);

    return (
        <>
            <h3 className="w-full text-xl">{title}</h3>
            <p className="pb-4 text-sm">
                {firstLine}
                <br />
                {secondLine}
            </p>
        </>
    );
};

export default StepsHeader;
