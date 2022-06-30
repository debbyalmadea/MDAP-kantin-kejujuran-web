const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const PORT = process.env.PORT || 8000;

require("dotenv").config();

// middleware
app.use(
    cors({})
);
app.use(express.json());

// serve static content
app.use(express.static(path.join(__dirname, "client/build")))


// ROUTES //

// register a user
app.post("/user/register", async(req, res) => {
    const existingUser = await pool.query(
        'SELECT student_id from "user" WHERE student_id=$1', [req.body.student_id]
    );

    if (existingUser.rowCount === 0) {
        // register
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await pool.query(
            'INSERT INTO "user" (student_id, password) VALUES($1, $2) RETURNING student_id', [req.body.student_id, hashedPassword]
        )
        
        const accessToken = generateAccessToken({student_id: req.body.student_id})
        res.json({ token: accessToken, loggedIn: true, student_id: req.body.student_id })
    } else {
        res.json({ loggedIn: false, status: "Student ID is already registered." })
    }
});

// log a user
app.post('/user/login', async(req, res) => {
    const user = await pool.query(
        'SELECT * FROM "user" WHERE student_id = $1', [req.body.student_id]
    );
    
    if (user.rowCount === 0) {
        res.json({ loggedIn: false, status: "Student ID is not registered." })
    } else {
        if (await bcrypt.compare(req.body.password, user.rows[0].password)) {
            const accessToken = generateAccessToken({student_id: req.body.student_id})
            res.json({ token: accessToken, loggedIn: true, student_id: req.body.student_id })
        } else {
            res.json({ loggedIn: false, status: "Wrong password." })
        }
    }
});

// authorize user
app.post('/user/auth', authenticateToken, async(req, res) => {
    if(req.user.student_id) {
        res.json({ loggedIn: true, student_id: req.user.student_id })
    } else {
        res.json({ loggedIn: false })
    }
});

// add new item
app.post('/item/add', async(req, res) => {
    const { name, price, image, description, student_id } = req.body
    try { 
        const newItem = await pool.query(
            'INSERT INTO item (name, price, image, description, seller_id) VALUES($1, $2, $3, $4, $5)', [name, price, image, description, student_id]
        )
        res.json({itemAdded: true})
    } catch (error) {
        res.status(400)
        res.json({itemAdded: false, status: "Oops...something went wrong."})
        console.log(error)
    }
});

// get sorted items
app.get('/item/sorted/:sort_by/:order', async(req, res) => {
    const sort_by = req.params.sort_by
    const order = req.params.order

    try {
        if (order === 'desc') {
            if (sort_by === 'created_timestamp') {
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE sold=FALSE ORDER BY created_timestamp DESC'
                )
                res.json(sortedItems.rows)
            } else if (sort_by === 'name'){
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE sold=FALSE ORDER BY name DESC'
                )
                res.json(sortedItems.rows)
            }
        } else {
            if (sort_by === 'created_timestamp') {
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE sold=FALSE ORDER BY created_timestamp'
                )
                res.json(sortedItems.rows)
            } else if (sort_by === 'name'){
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE sold=FALSE ORDER BY name'
                )
                res.json(sortedItems.rows)
            } 
        }

    } catch (error) {
        console.log(error)
    }
});

// get sorted items of all items sold by user based on student id
app.get('/:student_id/my-items/sold/:sold/sorted/:sort_by/:order', async (req, res) => {
    const student_id = parseInt(req.params.student_id)
    const sort_by = req.params.sort_by
    const order = req.params.order
    const sold = req.params.sold

    try {
        if (order === 'desc') {
            if (sort_by === 'created_timestamp') {
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE seller_id=$1 AND sold=$2 ORDER BY created_timestamp DESC', [student_id, sold]
                )
                res.json(sortedItems.rows)
            } else if (sort_by === 'name'){
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE seller_id=$1 AND sold=$2 ORDER BY name DESC', [student_id, sold]
                )
                res.json(sortedItems.rows)
            }
        } else {
            if (sort_by === 'created_timestamp') {
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE seller_id=$1 AND sold=$2 ORDER BY created_timestamp', [student_id, sold]
                )
                res.json(sortedItems.rows)
            } else if (sort_by === 'name'){
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE seller_id=$1 AND sold=$2 ORDER BY name', [student_id, sold]
                )
                res.json(sortedItems.rows)
            } 
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json({status: "Oops...something went wrong."})
    }
});

// get sorted items of all items bougth by user based on student id
app.get('/:student_id/my-items/bought/sorted/:sort_by/:order', async (req, res) => {
    const student_id = req.params.student_id
    const sort_by = req.params.sort_by
    const order = req.params.order

    try {
        if (order === 'desc') {
            if (sort_by === 'created_timestamp') {
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE buyer_id=$1 ORDER BY created_timestamp DESC', [student_id]
                )
                res.json(sortedItems.rows)
            } else if (sort_by === 'name'){
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE buyer_id=$1 ORDER BY name DESC', [student_id]
                )
                res.json(sortedItems.rows)
            }
        } else {
            if (sort_by === 'created_timestamp') {
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE buyer_id=$1 ORDER BY created_timestamp', [student_id]
                )
                res.json(sortedItems.rows)
            } else if (sort_by === 'name'){
                const sortedItems = await pool.query(
                    'SELECT * FROM item WHERE buyer_id=$1 ORDER BY name', [student_id]
                )
                res.json(sortedItems.rows)
            } 
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json({status: "Oops...something went wrong."})
    }
});

// buy item 
app.post('/item/buy', async(req, res) => {
    try {
        await pool.query(
            'UPDATE item SET sold=true, buyer_id=$1 WHERE id=$2', [req.body.buyer_id, req.body.id]
        )
        res.json({itemBought: true})
    } catch(error) {
        res.status(400)
        res.json({itemBought: false, status: "Oops...something went wrong."})
        console.log(error)
    }
})

// edit item
app.post('/item/edit', async(req, res) => {
    try {
        await pool.query(
            'UPDATE item SET name=$1, price=$2, image=$3, description=$4 WHERE id=$5', [req.body.name, req.body.price, req.body.image, req.body.description, req.body.id]
        )
        res.json({itemUpdated: true})
    } catch(error) {
        res.status(400)
        res.json({itemUpdated: false, status: "Oops...something went wrong."})
        console.log(error)
    }
})

// get canteen's balance
app.get('/balance', async(req, res) => {
    const balance = await pool.query(
        'SELECT balance FROM balance_box'
    )

    res.json(balance.rows[0])
});

// update canteen's balance
app.post('/balance', async(req, res) => {
    try {
        const balance = await pool.query(
            'UPDATE balance_box SET balance=$1 RETURNING balance', [req.body.balance]
        )
    
        res.json(balance.rows[0])
    } catch(error) {
        res.status(400)
        res.json({status: "Please enter valid amount of money."})
    }
});

// FUNCTION
// generate access token 
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

// authenticate token
function authenticateToken(req, res, next) {
    const token = req.body.token

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "/client/build/index.html")));

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});