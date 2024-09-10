const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password){
        return res.status(404).json( message = "Please enter a value for both username and password");
    }

    let usernameAlreadyInUse = isValid(username);

    if (!usernameAlreadyInUse){
        users.push({"username": username, "password": password});
        return res.status(200).json( message = "Registration Complete. Your account is now active");
    }

    else{
        return res.status(404).json( message = "User Already Exists");
    }

});



// Get the book list available in the shop
public_users.get('/',function (req, res) {

    console.log("Before calling promise")

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(console.log("Promise has been resolved"));
        }, 2000)
    })

    myPromise.then(() =>{    
        res.send(JSON.stringify(books,null,4));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    const isbn = parseInt(req.params.isbn);
    console.log("Before calling promise")

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(console.log("Promise has been resolved"));
        }, 3000)
    })

    myPromise.then(() =>{
        res.send(JSON.stringify(books[isbn],null,4));    
    })
});
  


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let bookKeys = Object.keys(books);
  let selectedBooks = [];

  for (const key of bookKeys){
    if (books[parseInt(key)].author === author){
        selectedBooks.push(books[parseInt(key)]);
    }}

  console.log("Before calling promise")

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {   
            resolve(console.log("Promise has been resolved"));
        }, 4000)
    })

    myPromise.then(() =>{
        res.send(JSON.stringify(selectedBooks,null,4));    
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let bookKeys = Object.keys(books);
  let selectedBooks = [];

  for (const key of bookKeys){
    if (books[parseInt(key)].title === title){
        selectedBooks.push(books[parseInt(key)]);
    }
  }

  console.log("Before calling promise")

  let myPromise = new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(console.log("Promise has been resolved"));
      }, 5000)
  })

  myPromise.then(() =>{
    res.send(JSON.stringify(selectedBooks,null,4));    
})

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = parseInt(req.params.isbn);
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
