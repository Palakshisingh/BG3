import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './menu.css';

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const { canteenId } = useParams();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log("Fetching items from server...");
                const response = await fetch(`http://localhost:8000/getMenu/${canteenId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                console.log("Items fetched successfully.");
                const data = await response.json();
                console.log("Items data:", data);
                // Adding a 'count' property to each item
                const itemsWithCount = data.map(item => ({ ...item, count: 0 }));
                setItems(itemsWithCount);
            } catch (error) {
                console.error("Error fetching items:", error);
                setError(error.message);
            }
        };

        fetchItems();

    }, [canteenId]); 

    console.log("Rendering menu component...");

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleAdd = async (index) => {
        try {
            const updatedItems = [...items];
            updatedItems[index].count += 1;
            setItems(updatedItems);
    
            const selectedItem = updatedItems[index];
    
            // Construct the request body
            const requestBody = {
                itemId: selectedItem._id, 
                quantity: selectedItem.count
            };
    
            // Make a POST request to add the item to the cart
            const response = await fetch('http://localhost:8000/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
    
    
        } catch (error) {
            console.error("Error adding item to cart:", error);
            // Handle error
        }
    }
    

    const handleSub = async (index) => {
        try {
            if (items[index].count > 0) {
                const updatedItems = [...items];
                updatedItems[index].count -= 1;
                setItems(updatedItems);
    
                const selectedItem = updatedItems[index];
    
                // Construct the request body
                const requestBody = {
                    itemId: selectedItem._id, 
                    quantity: selectedItem.count
                };
    
                // Make a POST request to remove the item from the cart
                const response = await fetch('http://localhost:8000/deletefromcart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to remove item from cart');
                }
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }    

    return (
        <div className="max-width">
            <div className='title'>
                MENU
            </div>
            <div className='item-collections'>
                {items.map((item, index) => (
                    <div className='item-cards' key={item._id}>
                        <div className="name-img-box">
                            <img src={item.ItemImage} alt={item.ItemName} className="item-image" />
                            <div className='item-name'>
                                {item.ItemName}
                            </div>
                        </div>
                        <div className="info-box">
                            <div className='item-description'>
                                {item.ItemDescription}
                            </div>
                            <div className='item-price'>
                                ₹{item.ItemPrice}
                            </div>
                        </div>
                        {item.count === 0 ? (
                            <div className="add-btn" onClick={() => handleAdd(index)}>
                                <div className="add-btn-text">
                                    <p>ADD</p>
                                </div>
                            </div>
                        ) : null}
                        {item.count > 0 ? (
                            <div className="add-btn">
                                <div className="add-btn-box">
                                    <div className='add-sub' onClick={() => handleSub(index)}>-</div>
                                    <div className="item-count">{item.count}</div>
                                    <div className='add-sub' onClick={() => handleAdd(index)}>+</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
