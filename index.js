import express from 'express'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { transactions } from './schema.js';
import { eq } from 'drizzle-orm';

const app = express()
const port = 5000

app.use(express.json())

const db = drizzle(process.env.DATABASE_URL);

app.get('/', (req, res) => {
    res.send('express js dah jalan')
})

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})

//ROUTES

//get all transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const result = await db.select().from(transactions);
        res.send(result)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get('/api/transactions/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await db.select().from(transactions).where(eq(transactions.id, id))
        res.send(result)
    } catch (err) {
        res.status(500).send(err)
    }
})

//create transactions
app.post('/api/transactions', async (req, res) => {
    try {
        const { title, amount, isdebtor, debtor, creditor, description, input_date, deadline, issettle } = req.body;
        await db.insert(transactions).values({
            title: title,
            amount: amount,
            isdebtor: isdebtor,
            debtor: debtor,
            creditor: creditor,
            description: description,
            input_date: input_date,
            deadline: deadline,
            issettle: issettle
        });
        res.send('transaksi tertambah');
    } catch (err) {
        res.status(500).send(err)
    }
})

// update transactions
app.put('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            amount,
            isdebtor,
            debtor,
            creditor,
            description,
            input_date,
            deadline,
            issettle
        } = req.body;

        await db.update(transactions).set({
            title: title,
            amount: amount,
            isdebtor: isdebtor,
            debtor: debtor,
            creditor: creditor,
            description: description,
            input_date: input_date,
            deadline: deadline,
            issettle: issettle
        }).where(eq(transactions.id, id));

        res.send(`transaksi ${id} terbaharui`)
    } catch (err) {
        res.status(500).send(err)
    }
})

// settle transactions
app.patch('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.update(transactions).set({ issettle: true }).where(eq(transactions.id, id));

        res.send(`transaksi ${id} telah settle`);
    } catch (err) {
        res.status(500).send(err)
    }
})

// delete transactions
app.delete('/api/transactions/:id', async(req, res) => {
    try {
        const {id} = req.params;

        await db.delete(transactions).where(eq(transactions.id, id));

        res.send(`transaksi ${id} terhapus`)
    } catch (err) {
        res.status(500).send(err)
    }
})