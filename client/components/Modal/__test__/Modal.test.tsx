import React from 'react';

import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Modal from '@components/Modal';

afterEach(cleanup);

describe('Modal', () => {
    const handleOpen = jest.fn();

    it('should not render content when openModal is false', () => {
        const { queryByTestId } = render(
            <Modal openModal={false} setOpenModal={handleOpen}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );
        expect(queryByTestId('modal-content')).not.toBeInTheDocument();
    });

    it('should render content when openModal is true', () => {
        const { getByTestId } = render(
            <Modal openModal={true} setOpenModal={handleOpen}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );
        expect(getByTestId('modal-content')).toBeInTheDocument();
    });
});
