import React from 'react';

export const formatPrice = (priceInCents) => {
    return `${priceInCents / 100}`
};