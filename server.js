"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

let funnyMode = false;
let jokeMode = false;

const getBotMessage = (text) => {
  const commonGreetings = ["hi", "hello", "howdy", "bonjour", "salut", "hey"];
  const commonGoodbyes = ["bye", "goodbye", "goodnight"];
  const somethingFunny = ["something funny"];
  const jokes = [
    "Why don’t ants ever get sick? Because they have little anty bodies.",
    "What’s a pirate’s favorite letter? You think it’s R, but it be the C.",
    "How does NASA organize a party? They planet.",
    "Why were they called the Dark Ages? Because there were lots of knights.",
    "Why aren’t koalas actual bears? The don’t meet the koalafications.",
    "Why did the old man fall in the well? Because he couldn't see that well!",
    "What do you call a factory that sells passable products? A satisfactory!",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it!",
    "Want to hear a joke about construction? I'm still working on it!",
    "How does Moses make his coffee? Hebrews it.",
    "I'm starting a new dating service in Prague. It's called Czech-Mate.",
    "A cheese factory exploded in France. Da brie is everywhere!",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    "What do sprinters eat before a race? Nothing, they fast!",
    "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
    "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right.",
  ];

  let botMsg = "";
  commonGreetings.filter((greet) => {
    if (text.toLowerCase().includes(greet)) {
      botMsg = "Hello!";
    }
  });
  commonGoodbyes.filter((bye) => {
    if (text.toLowerCase().includes(bye)) {
      botMsg = "Goodbye!";
    }
  });
  somethingFunny.filter((element) => {
    if (text.toLowerCase().includes(element)) {
      botMsg = "Do you want to hear a joke? <br><br> Answer with 'Yes' or 'No'";
      funnyMode = true;
    }
  });

  if (funnyMode && text === "Yes") {
    funnyMode = true;
    jokeMode = true;
    botMsg = `${
      jokes[Math.floor(Math.random() * jokes.length)]
    }<br><br>Do you want to hear another one?<br>Answer with 'Yes' or 'No'`;
  } else if (funnyMode && text === "No") {
    jokeMode = false;
    funnyMode = false;
    botMsg = "Ok.. goodbye!";
  } else if (funnyMode && jokeMode && text === "yes") {
    funnyMode = false;
    jokeMode = true;
    botMsg = `${
      jokes[Math.floor(Math.random() * jokes.length)]
    }<br><br>Do you want to hear another one?<br>Answer with 'Yes' or 'No'`;
  }
  return botMsg;
};

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const message = {
      author: "Monkey",
      text: messages[Math.floor(Math.random() * messages.length)],
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const message = { author: "Parrot", text: req.query.text };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    console.log(req.query.text);
    const message = {
      author: "Bot",
      text: `Bzzzt ${getBotMessage(req.query.text)}`,
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
