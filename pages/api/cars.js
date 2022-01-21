import { createCar } from "@/lib/redis";

// console.log(createCar);

export default async function handler(req, res) {
    const id = await createCar(req.body);

    // console.log(createCar);
    res.status(200).json({ id });
}
