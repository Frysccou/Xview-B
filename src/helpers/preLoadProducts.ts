import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
	name: string;
	price: number;
	description: string;
	image: string;
	categoryId: number;
	stock: number;
	genres: string[];
	author: string;
	year: number;
}

const productsToPreLoad: IProduct[] = [
	{
		name: "Alya Sometimes Hides her Feelings in Russian",
		price: 22.5,
		description:
			"Masachika Kuze es un estudiante de secundaria que se sienta junto a la hermosa y estoica mitad rusa, Alya, conocida por sus impecables calificaciones y su cabello plateado. Aparentemente distante, Alya a menudo murmura en ruso, creyendo que nadie puede entenderla. Sin embargo, Masachika, quien resulta ser un hablante fluido de ruso, escucha sus confesiones secretas y sus sentimientos ocultos. La historia sigue sus interacciones cómicas y románticas, donde Alya intenta mantener su fachada fría mientras sus verdaderos sentimientos se revelan gradualmente.",
		image: "https://image.tmdb.org/t/p/original/mvphQkTzkMyeJ1E7YmLDc8nc7SS.jpg",
		categoryId: 1,
		stock: 42,
		genres: ["Romance", "Comedy", "Slice of Life"],
		author: "SunSunSun",
		year: 2024,
	},
	{
		name: "Sakamoto Days",
		price: 24.99,
		description:
			"Taro Sakamoto era un legendario asesino, temido por todos los criminales. Sin embargo, se enamoró, se casó y tuvo una hija, lo que lo llevó a dejar su vida de violencia y a ganar peso. Ahora, Sakamoto dirige una tienda de conveniencia local, tratando de vivir una vida pacífica. Pero su pasado no lo deja en paz, y cuando viejos enemigos resurgen y su familia se ve amenazada, Sakamoto debe volver a la acción, demostrando que incluso un exasesino con sobrepeso sigue siendo una fuerza a tener en cuenta.",
		image: "https://image.tmdb.org/t/p/original/xfdyTs0SSVt2FySoL5IEnMzqANj.jpg",
		categoryId: 2,
		stock: 18,
		genres: ["Action", "Comedy", "Slice of Life"],
		author: "Yuto Suzuki",
		year: 2020,
	},
	{
		name: "Berserk",
		price: 29.99,
		description:
			"Berserk sigue la historia de Guts, un guerrero solitario marcado por un destino cruel y atormentado por demonios. Tras sobrevivir a una infancia brutal y unirse a la Banda del Halcón, un grupo de mercenarios liderado por el carismático Griffith, Guts encuentra camaradería y propósito. Sin embargo, un evento catastrófico conocido como el Eclipse lo sumerge en una búsqueda de venganza contra los Apóstoles, seres demoníacos que gobiernan el mundo. Armado con una espada gigante y una determinación inquebrantable, Guts lucha contra la oscuridad que lo rodea, buscando redención y un resquicio de esperanza en un mundo consumido por la violencia y la desesperación.",
		image: "https://image.tmdb.org/t/p/original/6WzLVzg97FSStqZO0iGkyBVwUUZ.jpg",
		categoryId: 2,
		stock: 12,
		genres: ["Action", "Dark Fantasy", "Horror", "Seinen"],
		author: "Kentaro Miura",
		year: 1989,
	},
	{
		name: "Classroom of the Elite",
		price: 21.5,
		description:
			"La Academia Koudo Ikusei es una prestigiosa escuela secundaria financiada por el gobierno japonés, con una tasa de empleo del 100%. Kiyotaka Ayanokouji, un estudiante reservado y enigmático, es asignado a la Clase 1-D, donde la escuela envía a los estudiantes con problemas. La escuela utiliza un sistema de puntos que actúa como moneda, otorgando a los estudiantes 100,000 puntos mensuales. Sin embargo, pronto descubren que el sistema es mucho más complejo y competitivo de lo que parece. La historia sigue a Kiyotaka y sus compañeros de clase mientras navegan por los desafíos de la escuela, donde la inteligencia, la manipulación y la supervivencia son clave.",
		image: "https://image.tmdb.org/t/p/original/acBS88Il9K3laU1ckSs6uV4qxF1.jpg",
		categoryId: 1,
		stock: 25,
		genres: ["Psychological", "Drama", "School", "Thriller"],
		author: "Shogo Kinugasa",
		year: 2015,
	},
	{
		name: "Frieren: Beyond Journey's End",
		price: 18.99,
		description:
			"Tras derrotar al Rey Demonio y restaurar la paz en el mundo, la maga elfa Frieren emprende un viaje para comprender mejor a la humanidad y sus emociones. A lo largo de su travesía, reflexiona sobre la mortalidad, la amistad y el paso del tiempo, explorando las relaciones que forjó con sus antiguos compañeros y las nuevas conexiones que establece en su camino.",
		image: "https://image.tmdb.org/t/p/original/dqZENchTd7lp5zht7BdlqM7RBhD.jpg",
		categoryId: 3,
		stock: 30,
		genres: ["Fantasy", "Adventure", "Slice of Life"],
		author: "Kanehito Yamada",
		year: 2020,
	},
	{
		name: "Soul Eater",
		price: 26.99,
		description:
			"En la Shibusen, una academia dedicada a entrenar Técnicos y Armas para luchar contra las fuerzas del mal, Maka Albarn y su compañero Soul Eater buscan convertir a Soul en una 'Death Scythe', un arma suprema. Para lograrlo, deben recolectar 99 almas malvadas y un alma de bruja. Junto a sus amigos Black Star y Tsubaki, y Death the Kid con sus pistolas gemelas Liz y Patty, se enfrentan a peligrosos enemigos, incluyendo brujas, demonios y el temible Kishin. La historia sigue sus aventuras mientras luchan por proteger el mundo y alcanzar sus objetivos.",
		image: "https://image.tmdb.org/t/p/original/eOWhNIW5VrrwtuFTdZH7p6e0RA1.jpg",
		categoryId: 2,
		stock: 20,
		genres: ["Action", "Comedy", "Supernatural", "Fantasy"],
		author: "Atsushi Ohkubo",
		year: 2004,
	},
	{
		name: "Las 100 novias que te quieren mucho, mucho, mucho, mucho, mucho",
		price: 16.5,
		description:
			"Rentarou Aijou, tras ser rechazado por 100 chicas, visita un santuario para pedir suerte en el amor. El dios del amor le revela que conocerá a 100 almas gemelas, pero si no les corresponde, morirán. Rentarou decide amarlas a todas, dando inicio a una comedia romántica caótica y llena de situaciones absurdas mientras intenta equilibrar sus relaciones con sus crecientes novias.",
		image: "https://image.tmdb.org/t/p/original/uGLPOAWnrbHxf1m5SZsrmNVHvYg.jpg",
		categoryId: 1,
		stock: 38,
		genres: ["Comedy", "Romance", "Harem", "Ecchi"],
		author: "Rikito Nakamura",
		year: 2019,
	},
	{
		name: "My Love Story with Yamada-kun at Lv999",
		price: 28.5,
		description:
			"Después de una ruptura dolorosa, Akane Kinoshita busca consuelo en un videojuego en línea que solía jugar con su exnovio. Ahí conoce a Yamada, un jugador de alto nivel famoso por su habilidad... y por ser completamente insociable. Aunque al principio parece frío e indiferente, Akane descubre que detrás de su fachada hay mucho más. Esta comedia romántica moderna explora el amor, la amistad y los vínculos que pueden surgir incluso en mundos virtuales.",
		image: "https://image.tmdb.org/t/p/original/qsanOnxFaZAwhR3zbXx3woWSXyN.jpg",
		categoryId: 2,
		stock: 15,
		genres: ["Romance", "Comedy", "Slice of Life", "Drama"],
		author: "Mashiro",
		year: 2023,
	},
	{
		name: "The Quintessential Quintuplets",
		price: 23.0,
		description:
			"Futaro Uesugi, un estudiante de secundaria pobre pero brillante, acepta un trabajo de tutor a tiempo parcial para un grupo de quintillizas idénticas: Ichika, Nino, Miku, Yotsuba y Itsuki Nakano. A pesar de sus personalidades distintas y su aversión inicial a estudiar, Futaro se compromete a ayudarlas a graduarse. A medida que pasa el tiempo, Futaro desarrolla una relación única con cada una de las quintillizas, y sus sentimientos se entrelazan en una compleja red de romance y amistad.",
		image: "https://image.tmdb.org/t/p/original/oOyzGEfZ6NjGjEWFxzCGjWv3Od6.jpg",
		categoryId: 1,
		stock: 33,
		genres: ["Comedy", "Romance", "Harem", "School"],
		author: "Negi Haruba",
		year: 2017,
	},
	{
		name: "Fire Force",
		price: 25.0,
		description:
			"En un mundo donde la combustión espontánea humana amenaza a la humanidad, Shinra Kusakabe, un joven con la capacidad de controlar las llamas, se une a la Compañía Especial de Bomberos 8. Junto a sus compañeros, lucha contra los 'Infernales', seres humanos que se han convertido en monstruos de fuego. A medida que Shinra se adentra en su trabajo, descubre una conspiración que se oculta tras los incendios y su propia conexión con ellos.",
		image: "https://image.tmdb.org/t/p/original/dCZIpt4yN42KhHmZiYVsKEr4yRT.jpg",
		categoryId: 2,
		stock: 22,
		genres: ["Action", "Supernatural", "Sci-Fi", "Shounen"],
		author: "Atsushi Ohkubo",
		year: 2015,
	},
	{
		name: "Solo Leveling",
		price: 27.0,
		description:
			"En un mundo donde los portales conectan la Tierra con mazmorras llenas de monstruos, los cazadores, humanos con habilidades especiales, se dedican a explorar estas mazmorras. Sung Jin-Woo, conocido como el cazador más débil de la humanidad, lucha por sobrevivir en este peligroso mundo. Sin embargo, un día, tras una mazmorra de alto riesgo, Jin-Woo obtiene la capacidad única de subir de nivel, como en un videojuego. A medida que se vuelve más fuerte, debe enfrentarse a desafíos cada vez mayores y descubrir los secretos detrás de sus nuevos poderes.",
		image: "https://image.tmdb.org/t/p/original/a7i9OdTUo9jZ1XoraCRIQNJ6ACX.jpg",
		categoryId: 2,
		stock: 17,
		genres: ["Action", "Fantasy", "Adventure", "Isekai"],
		author: "Chugong",
		year: 2018,
	},
	{
		name: "Dan Da Dan",
		price: 20.0,
		description:
			"Momo Ayase, una chica de secundaria que cree en fantasmas, y Ken Takakura, un chico obsesionado con los extraterrestres, se unen para investigar fenómenos sobrenaturales. A pesar de sus creencias opuestas, su investigación los lleva a descubrir un mundo de espíritus y alienígenas que supera sus expectativas. A medida que se enfrentan a peligrosos enemigos y situaciones extrañas, su amistad se fortalece y sus creencias se ponen a prueba.",
		image: "https://image.tmdb.org/t/p/original/k6wUBhZGmKGgHBnx5lOCRmAOjiD.jpg",
		categoryId: 1,
		stock: 28,
		genres: ["Action", "Comedy", "Supernatural", "Sci-Fi"],
		author: "Yukinobu Tatsu",
		year: 2021,
	},
	{
		name: "One Piece",
		price: 29.0,
		description:
			"Monkey D. Luffy, un joven aventurero con el poder de convertirse en goma, zarpa en un viaje para convertirse en el Rey de los Piratas y encontrar el legendario tesoro conocido como 'One Piece'. Junto a su variopinta tripulación, los Piratas del Sombrero de Paja, Luffy navega por los mares, enfrentándose a peligrosos enemigos, explorando islas exóticas y forjando lazos de amistad inquebrantables. La historia sigue sus aventuras mientras luchan por la libertad, la justicia y sus sueños.",
		image: "https://image.tmdb.org/t/p/original/rlXwxRqZa0dMssgYLQeoNo4WiXg.jpg",
		categoryId: 1,
		stock: 10,
		genres: ["Action", "Adventure", "Comedy", "Fantasy"],
		author: "Eiichiro Oda",
		year: 1997,
	},
	{
		name: "Toilet-Bound Hanako-kun",
		price: 24.5,
		description:
			"En la Academia Kamome, abundan los rumores sobre los Siete Misterios, sucesos sobrenaturales que acechan la escuela. Uno de ellos es Hanako-san, un espíritu que concede deseos a cambio de un precio. Yashiro Nene, una estudiante desesperada por el amor, invoca a Hanako-san, pero descubre que en realidad es un chico llamado Hanako-kun. A partir de ahí, Nene se convierte en su asistente y se ve envuelta en el mundo de los espíritus, donde descubre secretos oscuros y peligros ocultos.",
		image: "https://image.tmdb.org/t/p/original/iehq6tSUylg5kFkOxndNYZWjzNu.jpg",
		categoryId: 1,
		stock: 25,
		genres: ["Comedy", "Supernatural", "Romance", "School"],
		author: "Iro Aida",
		year: 2014,
	},
	{
		name: "Dr. Stone",
		price: 19.99,
		description:
			"Después de que una misteriosa luz petrifica a toda la humanidad, el joven prodigio Senku Ishigami despierta miles de años después en un mundo donde la civilización ha desaparecido. Con su vasto conocimiento científico, Senku se propone reconstruir la sociedad y descubrir la causa de la petrificación.",
		image: "https://image.tmdb.org/t/p/original/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg",
		categoryId: 1,
		stock: 37,
		genres: ["Adventure", "Science Fiction"],
		author: "Riichiro Inagaki",
		year: 2017,
	},
	{
		name: "Blue Exorcist",
		price: 19.99,
		description:
			"Rin Okumura descubre que es el hijo de Satán y decide convertirse en exorcista para luchar contra su destino y proteger a la humanidad de las fuerzas demoníacas.",
		image: "https://image.tmdb.org/t/p/original/722YXK2bm7Ht8AWFRRE73MjfYsc.jpg",
		categoryId: 1,
		stock: 23,
		genres: ["Action", "Supernatural", "Fantasy"],
		author: "Kazue Kato",
		year: 2009,
	},
	{
		name: "Blue Lock",
		price: 19.99,
		description:
			"Tras una desastrosa actuación en la Copa del Mundo de 2018, la Asociación de Fútbol de Japón inicia el proyecto 'Blue Lock': un programa de entrenamiento masivo para crear al delantero definitivo que pueda llevar a Japón a la gloria futbolística. Yoichi Isagi, un joven delantero, se une a este programa con la esperanza de convertirse en el mejor goleador del mundo.",
		image: "https://image.tmdb.org/t/p/original/sTDTy73OYmKY51EK94Mc6AxogzR.jpg",
		categoryId: 1,
		stock: 42,
		genres: ["Sports", "Drama"],
		author: "Muneyuki Kaneshiro",
		year: 2018,
	},
	{
		name: "Spy x Family",
		price: 19.99,
		description:
			"El espía maestro conocido como 'Twilight' recibe la misión de formar una familia falsa para infiltrarse en una prestigiosa escuela. Sin saberlo, adopta a una niña telépata y se casa con una asesina profesional, creando una dinámica familiar llena de secretos y situaciones cómicas.",
		image: "https://image.tmdb.org/t/p/original/3r4LYFuXrg3G8fepysr4xSLWnQL.jpg",
		categoryId: 1,
		stock: 28,
		genres: ["Action", "Comedy", "Spy"],
		author: "Tatsuya Endo",
		year: 2019,
	},
	{
		name: "Demon Slayer",
		price: 19.99,
		description:
			"Tanjiro Kamado es un joven bondadoso que vive en las montañas con su familia. Un día, al regresar a casa, descubre que su familia ha sido masacrada por demonios, y su hermana menor, Nezuko, ha sido transformada en uno de ellos. Decidido a vengar a su familia y encontrar una cura para Nezuko, Tanjiro se convierte en un cazador de demonios, enfrentándose a numerosas adversidades en su camino.",
		image: "https://image.tmdb.org/t/p/original/tlNFKrkb0LzhnwvyiMSOoCB5dbj.jpg",
		categoryId: 1,
		stock: 15,
		genres: ["Action", "Adventure", "Dark Fantasy", "Historical"],
		author: "Koyoharu Gotouge",
		year: 2016,
	},
	{
		name: "My Dress-Up Darling",
		price: 19.99,
		description:
			"Wakana Gojou, un estudiante de secundaria apasionado por la confección de muñecas tradicionales, lleva una vida solitaria debido a un incidente en su infancia. Su mundo cambia cuando Marin Kitagawa, una compañera de clase extrovertida y aficionada al cosplay, descubre su habilidad para la costura y le pide ayuda para crear trajes. Juntos, exploran el mundo del cosplay, fortaleciendo su amistad y superando desafíos personales.",
		image: "https://image.tmdb.org/t/p/original/A6mxBwvvv63JXZm3xXKv4SugE0L.jpg",
		categoryId: 2,
		stock: 18,
		genres: ["Romance", "Slice of Life", "Comedy"],
		author: "Shinichi Fukuda",
		year: 2018,
	},
];

export const preLoadProducts = async () => {
	const products = await ProductRepository.find();
	if (!products.length)
		await AppDataSource.createQueryBuilder()
			.insert()
			.into(Product)
			.values(productsToPreLoad)
			.execute();
	console.log("Products preloaded");
};
