import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import NavBar from './components/NavBar';
import ShoppingListWrapper from './components/ShoppingListWrapper';
import './App.css';
import { users, shoppingLists } from './data';

function App() {
    const [shoppingListData, setShoppingListData] = useState(shoppingLists);
    const [filteredLists, setFilteredLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [currentUser, setCurrentUser] = useState(users[0]);

    useEffect(() => {
        if (currentUser) {
            setFilteredLists(shoppingListData.filter(list => list.members.includes(currentUser.id) || list.owner === currentUser.id));
        }
    }, [currentUser, shoppingListData]);

    const handleUpdateItems = (listId, updatedItems) => {
        setShoppingListData(prevData =>
            prevData.map(list =>
                list.id === listId ? { ...list, items: updatedItems } : list
            )
        );
    };

    const [editingListName, setEditingListName] = useState(null);

    const handleUpdateListName = (listId, newName) => {
        setShoppingListData(prevData =>
            prevData.map(list => 
                list.id === listId ? { ...list, listName: newName } : list
            )
        );
        setEditingListName(null);
    };

    useEffect(() => {
        if (selectedList) {
            const updatedList = shoppingListData.find(list => list.id === selectedList.id);
            if (updatedList) {
                setSelectedList(updatedList);
            }
        }
    }, [shoppingListData]);

    const handleUpdateMembers = (listId, updatedMembers) => {
        setShoppingListData(prevData =>
            prevData.map(list =>
                list.id === listId ? { ...list, members: updatedMembers } : list
            )
        );
    };    

    return (
        <div className="app-container">
            <AppHeader logoSrc="/cart.png" titleText="Shopping list app" />
            <NavBar
                users={users}
                currentUser={currentUser}
                onSelectUser={setCurrentUser}
            />
            <ShoppingListWrapper
                shoppingListData={filteredLists}
                selectedList={selectedList}
                onSelectList={setSelectedList}
                onDeselectList={() => setSelectedList(null)}
                currentUser={currentUser}
                onUpdateItems={handleUpdateItems}
                editingListName={editingListName}
                onEditListName={setEditingListName}
                onUpdateListName={handleUpdateListName}
                onUpdateMembers={handleUpdateMembers}
            />
        </div>
    );
}

export default App;