import React, { useState } from 'react';
const OwnerPage = () => {
    const [ItemName, setItemName] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [ItemImage, setItemImage] = useState("");
    const [ItemQuantity, setItemQuantity] = useState("");

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const apiKey = '363398383525658'; 
        const cloudName = 'dh4hs9xvf';
        const uploadPreset = 'ml_default';
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
    
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${uploadPreset}&api_key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const data = await response.json();
                setItemImage(data.secure_url); 
                console.log('Image uploaded successfully:', data);
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const requestData = {
                ItemName,
                ItemPrice,
                ItemQuantity,
                ItemImage,
            };

            const response = await fetch('http://localhost:8000/getownermenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit canteen data');
            }

            console.log('Canteen data submitted successfully');
            setItemName("");
            setItemImage("");
            setItemQuantity("");
            setItemPrice("");

        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="item-name">
                    <input 
                        type="text" 
                        placeholder="Enter Item Name"
                        value={ItemName}
                        onChange={(event) => setItemName(event.target.value)}
                        required
                    />
                </div>
                <div className="item-price">
                    <input 
                        type="text" 
                        placeholder="Enter Item Price"
                        value={ItemPrice}
                        onChange={(event) => setItemPrice(event.target.value)}
                        required
                    />
                </div>
                <div className="item-quantity">
                    <input 
                        type="text" 
                        placeholder="Enter Item Quantity"
                        value={ItemQuantity}
                        onChange={(event) => setItemQuantity(event.target.value)}
                        required
                    />
                </div>
                <div className="item-image">
                    <input 
                        type="file" 
                        onChange={handleImageUpload}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default OwnerPage;
