import { Apple, Cherry, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header className={`flex justify-between items-center px-6 py-3 ${isHome ? 'bg-transparent' : 'bg-blue-500 text-white shadow-lg'}`}>
            <h1 className="flex text-xl font-bold"><Cherry />STORE FRUIT</h1>
            <nav>
                <ul className="flex gap-6">
                    <li className="hover:text-gray-700"><Link to="/">Home</Link></li>
                    <li className="hover:text-gray-700"><Link to="/about">About</Link></li>
                    <li className="hover:text-gray-700"><Link to="/fruit">Fruit</Link></li>
                </ul>
            </nav>
        </header>
    );
}
