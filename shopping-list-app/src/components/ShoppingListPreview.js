import React from 'react';
import './styles/ShoppingListPreview.css';

function ShoppingListPreview({ list, onSelect }) {
    return (
        <div className="shopping-list-preview">
            <h2>{list.listName}</h2>
            <p>{list.items.length} items in total</p>
            <p>{list.items.filter(item => item.solved).length} items solved</p>
            <button onClick={() => onSelect(list)}>View detail</button>
        </div>
    );
}

export default ShoppingListPreview;
