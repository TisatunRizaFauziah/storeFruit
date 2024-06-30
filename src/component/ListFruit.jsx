import React from "react";
import { Pencil, Delete, BadgeInfo } from "lucide-react";

const ListFruit = ({ proopsFruit, onEdit, onDelete }) => {
    const { id, image, name, harga } = proopsFruit;

    const handleEdit = () => {
        onEdit(id);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleShowInfo = () => {
        alert(` Name: ${name}\n Price: ${harga}`);
    };

    return (
        <div className="border p-5 w-72 h-auto m-1 shadow-lg rounded-lg">
            <img src={image} className="mx-auto w-1/2 h-24 mb-4" alt={name} />
            <h1 className="text-center font-semibold text-xl mb-2">{name}</h1>
            <p className="text-center text-gray-700 mb-4">{harga}</p>
            <div className="flex justify-around gap-2">
                <button onClick={handleShowInfo} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:shadow-lg">
                <BadgeInfo /> 
                </button>
                <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 hover:shadow-lg">
                    <Pencil />
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 hover:shadow-lg">
                    <Delete />
                </button>
            </div>
        </div>
    );
};

export default ListFruit;
