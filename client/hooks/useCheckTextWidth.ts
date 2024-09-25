import { type RefObject, useEffect, useState } from 'react';

const useCheckTextWidth = <T extends HTMLElement>(
    textElementRef: RefObject<T>,
    text: string | undefined,
    noPadding?: boolean
) => {
    const [style, setStyle] = useState<{
        width: number;
        height: number;
        lines: number;
    }>({ width: 0, height: 0, lines: 0 });

    useEffect(() => {
        if (text && textElementRef.current) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (context) {
                const element = textElementRef.current;
                const fontWeight = parseFloat(
                    getComputedStyle(element).fontWeight
                );
                const fontSize = parseFloat(getComputedStyle(element).fontSize);
                const paddingHorizontal =
                    parseFloat(getComputedStyle(element).paddingLeft) +
                    parseFloat(getComputedStyle(element).paddingRight);
                const letterSpacing = parseFloat(
                    getComputedStyle(element).letterSpacing
                );

                context.font = `${fontWeight} ${
                    fontSize + letterSpacing
                }px Poppins`;

                const containerWidth = element.offsetWidth - paddingHorizontal;

                const measuredWidth = context.measureText(text).width;
                const width =
                    measuredWidth + (noPadding ? 0 : paddingHorizontal);

                const paddingVertical =
                    parseFloat(getComputedStyle(element).paddingTop) +
                    parseFloat(getComputedStyle(element).paddingBottom);

                const height = element.offsetHeight - paddingVertical;

                const lines = Math.floor(width / containerWidth) + 1;

                setStyle({
                    width,
                    height,
                    lines,
                });
            }
        }
    }, [text]);

    return { style };
};

export default useCheckTextWidth;
