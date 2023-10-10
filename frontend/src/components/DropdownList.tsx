import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

export type DropdownListItem = {
    name: string,
    onClick: () => void,
    render?: () => React.ReactElement
}

type DropdownListType = {
    icon: React.ReactElement,
    items: DropdownListItem[],
    className?: string
}

const DropdownList = ({ icon, items, className = "" }: DropdownListType) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setOpen(false));

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setOpen((prev) => !prev)}>
                {icon}
            </button>
            {
                open &&
                <ul className={`absolute flex flex-col justify-center items-center rounded-sm overflow-hidden ${className}`}>
                    {items.map((item, index) => (
                        <li key={item.name} className="w-full">
                            <button className="w-full px-6 py-1 bg-gray-600 text-light-color hover:bg-gray-700 focus-visible:outline-none focus-visible:bg-gray-700" onClick={() => { setOpen(false); return item.onClick() }}>
                                {

                                    item.render ? item.render() :
                                        <p className="text-left">
                                            {item.name}
                                        </p>
                                }
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