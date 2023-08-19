import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

export type DropdownListItem = {
    name: string,
    onClick: () => void
}

type DropdownListType = {
    items: DropdownListItem[],
    className: string
}

const DropdownList = ({ items, className }: DropdownListType) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <button onClick={() => setOpen((prev) => !prev)}>
                <FaEllipsisH />
            </button>
            {
                open &&
                <ul className="absolute flex flex-col justify-center items-center rounded-sm overflow-hidden">
                    {items.map((item, index) => (
                        <li key={item.name}>
                            <button className="px-6 py-1 bg-gray-600 text-light-color hover:bg-gray-700 focus-visible:outline-none focus-visible:bg-gray-700" onClick={() => { setOpen(false); return item.onClick() }}>
                                {item.name}
                            </button>
                            {
                                index !== items.length - 1 &&
                                <hr className="w-full" />
                            }
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export { DropdownList };
export default DropdownList;