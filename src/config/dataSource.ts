import { DataSource } from "typeorm";
import { DATABASE_URL } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Order } from "../entities/Order";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export const AppDataSource = new DataSource({
	type: "postgres",
	url: DATABASE_URL,
	synchronize: true,
	logging: false,
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
	entities: [User, Credential, Order, Product, Category],
	subscribers: [],
	migrations: [],
});
