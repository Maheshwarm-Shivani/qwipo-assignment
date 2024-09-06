const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection using .env for security
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));

// API to Get Sorted List of Users
app.get("/", (req, res) => {
    UserModel.find({})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// API to Get User by ID
app.get("/getUser/:id", (req, res) => {
    const { id } = req.params;

    UserModel.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// API to Update User by ID
app.put("/updateUser/:id", (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, PhoneNo, Email, Address } = req.body;

    UserModel.findByIdAndUpdate(id, { FirstName, LastName, PhoneNo, Email, Address }, { new: true })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// API to Delete User by ID
app.delete("/deleteUser/:id", (req, res) => {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id)
        .then(user => {
            if (user) {
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// API to Create New User
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Start the Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
