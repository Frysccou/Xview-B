import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Order } from "../entities/Order";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

const DATABASE_URL = process.env.DATABASE_URL!;

const parsedUrl = new URL(DATABASE_URL);

export const AppDataSource = new DataSource({
	type: "postgres",
	host: parsedUrl.hostname,
	port: 5432,
	username: parsedUrl.username,
	password: parsedUrl.password,
	database: parsedUrl.pathname.split("/")[1],
	synchronize: true,
	logging: false,
	entities: [User, Credential, Order, Product, Category],
	subscribers: [],
	migrations: [],
});
