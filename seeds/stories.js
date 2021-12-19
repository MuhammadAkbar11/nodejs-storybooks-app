const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const StoryModel = require("../models/Story");
const UserModel = require("../models/User");
const { randomSelect } = require("../utils");

// Load config
dotenv.config({ path: "../config/config.env" });

connectDB();

async function generateStories() {
  let stories = [];

  const result =
    process.argv.find(arg => arg.includes("row"))?.split("=")[1] || 11;
  try {
    const users = await UserModel.find({});

    const storyDataJson = fs.readFileSync(path.resolve("data/story.json"));
    const dummyData = JSON.parse(storyDataJson);
    const { body_list, title_list } = dummyData;

    for (let i = 0; i < result; i++) {
      const title = randomSelect(title_list);
      const body = randomSelect(body_list);
      const status = "public";
      const user = randomSelect(users);

      stories.push({
        title,
        body,
        status,
        user: user._id,
      });
    }

    await StoryModel.insertMany(stories);

    console.log(`Generete Success!`);
    console.log("Generating : " + stories.length + " row \n");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

async function destroyStories() {
  try {
    await StoryModel.deleteMany();
    console.log(`Destory Stories Success!`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

const param = process.argv[2];

const command = process.argv.find(arg => arg.includes("do")).split("=")[1];

if (command == "generate") {
  generateStories();
} else if (command == "destroy") {
  destroyStories();
} else {
  console.log("Unknown command");
  process.exit();
}
