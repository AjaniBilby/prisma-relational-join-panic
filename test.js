import { Prisma, PrismaClient } from "@prisma/client";
import 'dotenv/config';

function getClient() {
	const databaseUrl = new URL(process.env.DATABASE_URL);
	console.info(`🔌 setting up prisma client to ${databaseUrl.host}`);
	const client = new PrismaClient({
		datasources: {
			db: {
				url: databaseUrl.toString(),
			},
		},
	});
	// connect eagerly
	client.$connect();

	return client;
}

const prisma = getClient();


async function Read(orderID) {
	return await prisma.thing.findUnique({
		select: { id: true },
		where:  { id: orderID },
		relationLoadStrategy: "join" // remove this and there is no panic
	});
}


async function run() {
	const set = [1,2]; // reduce to one item and there is no panic

	const results = await Promise.all(set.map(Read));
	console.log(results);
}

run();