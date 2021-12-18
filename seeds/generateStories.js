const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../config/db");
const StoryModel = require("../models/Story");
const UserModel = require("../models/User");
const { randomSelect } = require("../utils");

// Load config
dotenv.config({ path: "../config/config.env" });

connectDB();

const storyBody = `
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>

<p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.</p>

<p>Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,</p>
`;

async function generateStories() {
  let stories = [];

  try {
    const users = await UserModel.find({});

    for (let i = 0; i < 20; i++) {
      const title = "This Some Dummuy Title";
      const body = storyBody;
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
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

generateStories();
