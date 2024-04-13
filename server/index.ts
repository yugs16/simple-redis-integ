import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

app.post('/submit', async (req, res) => {
	try {
		const problemId = req.body.problemId;
		const code = req.body.code;
		const lang = req.body.lang;
		console.log(req.body);
		// res.status(200).send('asas');

		await client.lPush('problems', JSON.stringify({ code, lang, problemId }));
		// Store in the database
		res.status(200).send('Submission received and stored.');
	} catch (error) {
		console.error('Redis error:', error);
		res.status(500).send('Failed to store submission.');
	}
});

async function startServer() {
	try {
		await client.connect();
		console.log('Connected to Redis');

		app.listen(3000, () => {
			console.log('Server is running on port 3000');
		});
	} catch (error) {
		console.error('Failed to connect to Redis', error);
	}
}

startServer();
