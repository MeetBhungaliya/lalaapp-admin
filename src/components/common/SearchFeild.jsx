import { SEARCH_ICON } from '@/lib/images'
import React, { useState } from 'react'

const SearchFeild = () => {
    const [search, setSearch] = useState();
    return (
        <div className="bg-ternary  px-5 py-3 rounded-[12px] flex items-center gap-2">
            <img src={SEARCH_ICON} alt="SEARCH_ICON" />
            <input
                type="text"
                className="placeholder:text-secondary text-base font-normal max-w-[] flex-1 bg-fill text-primary focus:outline-none border-none"
                placeholder="Search"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
            // onChange={handleChange}
            />
        </div>
    )
}

export default SearchFeild