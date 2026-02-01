import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index.js';
import User from '../models/user.model.js';
import Bot from '../models/bot.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  await Bot.deleteMany({});
});

test('POST /bot/v1/message returns bot response for known input', async () => {
  const res = await request(app).post('/bot/v1/message').send({ text: 'hello' });
  expect(res.status).toBe(200);
  expect(res.body.userMessage.toLowerCase()).toContain('hello');
  expect(res.body.botMessage).toBeDefined();
});

test('POST /bot/v1/message returns 400 for empty input', async () => {
  const res = await request(app).post('/bot/v1/message').send({ text: '   ' });
  expect(res.status).toBe(400);
});

test('unknown message returns fallback', async () => {
  const res = await request(app).post('/bot/v1/message').send({ text: 'gibberishrandom' });
  expect(res.status).toBe(200);
  expect(res.body.botMessage).toBe("Sorry, I don't understand that!!!");
});

test('partial match works ("how are")', async () => {
  const res = await request(app).post('/bot/v1/message').send({ text: 'how are' });
  expect(res.status).toBe(200);
  expect(res.body.botMessage.toLowerCase()).toContain("i'm just a bot".toLowerCase());
});
