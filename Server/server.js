const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./Components/Config/dbConnect");
const userRouter = require("./Components/Router/userRouter");

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use(express.urlencoded({ extended: true }));

app.listen(8000, (error) => {
  if (error) {
    console.log("Error starting server!", error);
    process.exit(1);
  }
  console.log("Server is running at port: ", 8000);
});




//sign-in functionality
const valid_user = {
  email: "jessiecamaem@gmail.com", //hardcoded for demonstration purposes
  password: "admin1234",
};

app.get("/", (request, response) => {
  response.status(200).send("Hello world! \nIf you wanted a different response, maybe check the URL.");
});



//post functionality for sign-in
app.post("/login", (request, response) => {
  const { email, password } = request.body;

  try {
    if (email === valid_user.email && password === valid_user.password) {
      console.log(`[SIGN-IN] Successful log-in for  ${email}`); //server-side log
      return response.status(200).json({
        success: true,
        message: "Sign-in successful. Welcome!",
      });
    }

     if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    return response.status(401).json({
      success: false,
      message: "Invalid email or password. Try Again.",
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return response.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});


app.post("/greetings", (request, response) => {
  const { name, course, section } = request.body;
  response.status(200).json({
    name: name,
    course: course,
    section: section,
    message: `Hello ${name}! Welcome to ${course} course and you are in ${section}!`,
  });
});
