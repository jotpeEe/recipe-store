const getTextWidth = (
    text: string,
    limit?: number,
    fontSize = 16,
    fontFamily = 'Poppins'
): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        return 0;
    }

    context.font = `${fontSize}px ${fontFamily}`;

    const metrics = context.measureText(text);
    const { width } = metrics;

    if (limit && width > limit) {
        console.log(text.slice(text.length / 2));
    }

    return width;
};

export default getTextWidth;
