import dotenv from "dotenv";
dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;
export const JWT_SECRET: string = process.env.JWT_SECRET || "secret";
