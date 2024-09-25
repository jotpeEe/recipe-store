import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const processText = (
    inputText: string,
    containerWidth: number,
    font?: string
): string[] => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const paragraphs: string[] = [];

    if (context) {
        const fontSize = 16; // Adjust as needed
        const fontFamily = 'Arial'; // Adjust as needed
        context.font = `${fontSize}px ${fontFamily}`;

        let remainingText = inputText;
        while (remainingText.length > 0) {
            const textWidth = context.measureText(remainingText).width;

            if (textWidth <= containerWidth) {
                // The remaining text fits within the width limit
                paragraphs.push(remainingText);
                break;
            }

            const charactersPerLine = Math.floor(
                (remainingText.length * containerWidth) / textWidth
            );
            const firstLine = remainingText.slice(0, charactersPerLine);
            paragraphs.push(firstLine);
            remainingText = remainingText.slice(charactersPerLine);
        }
    }

    return paragraphs;
};
