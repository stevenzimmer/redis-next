import { useState } from "react";
export default function SearchForm() {
    const [hits, setHits] = useState([]);
    const search = async (e) => {
        // console.log(e);
        const q = e.target.value;

        if (q.length > 2) {
            const params = new URLSearchParams({ q });
            const res = await fetch(`api/search?${params}`);

            const result = await res.json();

            setHits(result["cars"]);

            // console.log({ hits });
        }
    };
    return (
        <div>
            <input type="text" onChange={search} placeholder="search cars" />
            {hits?.map((hit, i) => {
                return (
                    <div key={i}>
                        {hit.make}, {hit.model}
                    </div>
                );
            })}
        </div>
    );
}
