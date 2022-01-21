import { getCars } from "@/lib/redis";

export default async function handler(req, res) {
    const cars = await getCars();
    // console.log({ cars });
    res.status(200).json({ cars });
}
