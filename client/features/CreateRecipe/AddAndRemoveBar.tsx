import React, { type FC } from 'react';

import { Button } from '@components';

type Handler = () => void;

const AddAndRemoveBar: FC<{ handleAdd: Handler; handleRemove: Handler }> = ({
    handleAdd,
    handleRemove,
}) => (
    <div className="flex justify-between pb-4">
        <Button onClick={handleAdd} size="sm">
            &#8675; add
        </Button>
        <Button onClick={handleRemove} size="sm" variant="outlined">
            &#8673; remove
        </Button>
    </div>
);

export default AddAndRemoveBar;
