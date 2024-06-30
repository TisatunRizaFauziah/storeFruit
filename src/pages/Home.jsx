import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-purple-500 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">WELCOME TO OUR FRUIT STORE</h1>
                <p className="text-xl mb-8">Discover Various Fresh & Quality Fruits</p>
                <Link to="/fruit">
                    <button className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white py-3 px-6 rounded-lg shadow-lg transition duration-300">
                        View Our Fruits
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

