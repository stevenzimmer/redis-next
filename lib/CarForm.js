export default function CarForm({ setCars }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const res = await fetch(`api/cars`, {
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const result = await res.json();

        setCars((oldCars) => [...oldCars, formData]);
        console.log({ result });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="make" placeholder="make" />
            <input type="text" name="model" placeholder="model" />

            <input type="text" name="image" placeholder="image" />

            <input type="text" name="description" placeholder="description" />

            <button type="submit">Create car</button>
        </form>
    );
}
