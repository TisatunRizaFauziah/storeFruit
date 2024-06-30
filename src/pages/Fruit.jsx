import React, { useState, useEffect } from "react";
import ListFruit from "../component/ListFruit";
import { SquarePlus } from "lucide-react";

const Fruit = () => {
    const initialFruits = [
        {
            id: 1,
            image: "/pisang.jpg",
            name: "Pisang",
            harga: 5000,
            color: "yellow",
        },
        {
            id: 2,
            image: "/anggur.jpg",
            name: "Anggur",
            harga: 10000,
            color: "purple",
        },
        {
            id: 3,
            image: "/manggis.jpg",
            name: "Manggis",
            harga: 10000,
            color: "purple",
        },
    ];

    const [fruits, setFruits] = useState(initialFruits);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fruitName, setFruitName] = useState('');
    const [fruitHarga, setFruitHarga] = useState('');
    const [fruitImage, setFruitImage] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const storedFruits = JSON.parse(localStorage.getItem("fruits"));
        if (storedFruits) {
            setFruits(storedFruits);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("fruits", JSON.stringify(fruits));
    }, [fruits]);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        resetForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setFruitName(value);
        if (name === 'harga') setFruitHarga(value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFruitImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (jpg or png)');
        }
    };

    const handleAddFruit = () => {
        if (!fruitName || !fruitHarga || !fruitImage) return;

        const newFruit = {
            id: fruits.length + 1,
            image: fruitImage,
            name: fruitName,
            harga: fruitHarga,
            color: determineFruitColor(fruitName.toLowerCase()),
        };

        const updatedFruits = [...fruits, newFruit];
        setFruits(updatedFruits);
        handleCloseModal();
    };

    const handleEditFruit = () => {
        if (!fruitName || !fruitHarga || editId === null) return;

        const editedFruits = fruits.map(fruit => {
            if (fruit.id === editId) {
                return {
                    ...fruit,
                    name: fruitName,
                    harga: fruitHarga,
                    image: fruitImage || fruit.image, // Use existing image if no new image is selected
                    color: determineFruitColor(fruitName.toLowerCase()),
                };
            }
            return fruit;
        });

        setFruits(editedFruits);
        handleCloseModal();
    };

    const handleDeleteFruit = (id) => {
        const updatedFruits = fruits.filter(fruit => fruit.id !== id);
        setFruits(updatedFruits);
    };

    const handleEdit = (id) => {
        const fruitToEdit = fruits.find(fruit => fruit.id === id);
        if (fruitToEdit) {
            setFruitName(fruitToEdit.name);
            setFruitHarga(fruitToEdit.harga);
            setFruitImage(fruitToEdit.image);
            setEditId(id);
            setIsModalOpen(true);
        }
    };

    const determineFruitColor = (fruitName) => {
        switch (fruitName) {
            case 'pisang':
                return 'yellow';
            case 'anggur':
            case 'manggis':
                return 'purple';
            default:
                return 'unknown';
        }
    };

    const resetForm = () => {
        setFruitName('');
        setFruitHarga('');
        setFruitImage(null);
    };

    const handleSortByColor = () => {
        const sortedFruits = [...fruits].sort((a, b) => {
            if (a.color < b.color) return -1;
            if (a.color > b.color) return 1;
            return 0;
        });
        setFruits(sortedFruits);
    };

    return (
        <>
            <div className="relative">
                <button onClick={handleOpenModal} className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:shadow-lg">
                    <SquarePlus />
                </button>
                <button onClick={handleSortByColor} className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 hover:shadow-lg">
                    Sort by Color
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold mb-4">{editId ? 'Edit Fruit' : 'Add New Fruit'}</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Fruit Name"
                            value={fruitName}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-4"
                        />
                        <input
                            type="text"
                            name="harga"
                            placeholder="Fruit Price"
                            value={fruitHarga}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-4"
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png"
                            onChange={handleFileChange}
                            className="border p-2 w-full mb-4"
                        />
                        <div className="flex justify-end gap-4">
                            <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                                Cancel
                            </button>
                            <button onClick={editId ? handleEditFruit : handleAddFruit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                                {editId ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h1 className="text-3xl font-bold text-center text-black-600 my-5">LIST OF FRUITS AND PRICES</h1>
                <div className="flex flex-wrap justify-around m-5">
                    {fruits.map((data) => (
                        <ListFruit
                            key={data.id}
                            proopsFruit={data}
                            onEdit={handleEdit}
                            onDelete={handleDeleteFruit}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Fruit;
