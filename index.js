const TelegramApi = require("node-telegram-bot-api");
const {gameOptionsm againOptions} = require(options.js)
const token = "6113741815:AAGCm49lYrD1pEgNAiewqZo5SxJ-F1e1WzQ";

const bot = new TelegramApi(token, { polling: true });

const chats = {};


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас загадаю цифру, а ты угадай`);
	const randomNumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomNumber;
	await bot.sendMessage(chatId, "Отгадывай", gameOptions);
}

const start = () => {
	bot.setMyCommands([
		{ command: "/start", description: "Начальное приветствие" },
		{ command: "/info", description: "Информация о пользователе" },
		{ command: "/game", description: "Игра" },
	]);

	bot.on("message", async (msg) => {
		const text = msg.text;
		const chatId = msg.chat.id;
		console.log(msg);
		if (text === "/start") {
			await bot.sendSticker(
				chatId,
				"https://t.me/TgSticker/26372?comment=937087"
			);
			return bot.sendMessage(chatId, "Добро пожаловать браток");
		}
		if (text === "/info") {
			return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
		}
		if (text === "/game") {
			return startGame(chatId)
		}

		return bot.sendMessage(chatId, "Я тебя не понимаю браток");
	});

	bot.on("callback_query", async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;
        if (data === "/again") {
            return startGame(chatId);
        }
		if (data === chats[chatId]) {
			return bot.sendMessage(
				chatId,
				`Ты угадал бро, цифра ${chats[chatId]}`, againOptions
			);
		} else {
			return bot.sendMessage(
				chatId,
				`Не угадал браток, цифра была ${chats[chatId]}`, againOptions
			);
		}
	});
};

start();
// запуск - npm run dev
