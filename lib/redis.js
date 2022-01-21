import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

async function close() {
    await client.close();
}

class Car extends Entity {}

let schema = new Schema(
    Car,
    {
        // Hash keys
        make: {
            type: "string",
            textSearch: true,
        },
        model: {
            type: "string",
            textSearch: true,
        },
        image: {
            type: "string",
        },
        description: {
            type: "string",
            textSearch: true,
        },
    },
    {
        dataStructure: "JSON",
    }
);

export async function createCar(data) {
    // await close();
    // Connect to database client
    await connect();

    const repository = new Repository(schema, client);

    // Create new data with plain JS object
    const car = repository.createEntity(data);

    // Commit new data to database
    const id = await repository.save(car);

    await close();

    return id;
}

export async function createIndex() {
    // await close();
    // Connect to database client
    await connect();

    const repository = new Repository(schema, client);

    await repository.createIndex();

    await close();
}

export async function searchCars(q) {
    // await close();

    // Connect to database client
    await connect();

    const repository = new Repository(schema, client);

    const cars = await repository
        .search()
        .where("make")
        .matches(q)
        .or("model")
        .matches(q)
        .or("description")
        .matches(q)
        .return.all();

    await close();

    return cars;
}

export async function getCars() {
    // await close();

    // Connect to database client
    await connect();

    const repository = new Repository(schema, client);

    const cars = await repository.search().return.all();

    await close();

    return cars;
}
