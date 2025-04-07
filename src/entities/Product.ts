import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Category } from "./Category";

@Entity({ name: "products" })
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column("decimal", { precision: 10, scale: 2 })
	price: number;

	@Column()
	stock: number;

	@Column()
	image: string;

	@Column({
		type: "text",
		transformer: {
			to: (value: string[]) => JSON.stringify(value),
			from: (value: string) => JSON.parse(value),
		},
	})
	genres: string[];

	@Column()
	categoryId: number;

	@ManyToOne(() => Category, (category) => category.products)
	@JoinColumn({ name: "categoryId" })
	category: Category;
}
