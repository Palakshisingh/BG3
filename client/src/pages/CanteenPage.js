import React, { useState, useEffect } from 'react';

const CanteenPage = () => {
    const [canteenData, setCanteenData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/canteen');
                if (!response.ok) {
                    throw new Error('Failed to fetch canteen data');
                }
                const data = await response.json();
                setCanteenData(data);
            } catch (error) {
                console.error('Error fetching canteen data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <div><h1>Hello!</h1></div>
            {canteenData.map((item, index) => (
                <div key={index} className='item'>
                    <div className='itemName'>
                        <h1>Name: {item.itemName}</h1>
                    </div>
                    <div className='itemPrice'>
                        <h1>Price: {item.itemPrice}</h1>
                    </div>
                    <div className='halfPrice'>
                        <h1>Half Price: {item.halfPrice}</h1>
                    </div>
                    <div className='itemImage'>
                        <img src={item.itemImage} alt={item.itemName} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CanteenPage;
