// requiring the Todo schema from the model folder in the todo.js file
const { Todo } = require("../model/todo");

const { User } = require("../model/user"); //requirng the User model using the destructing form

// sending or saving a todo data to the database
const addTodo = async (req, res) => {
  try {
    // destructing of todo, content
    const { todo, content } = req.body;
    // destructing of userId and setting it req.params as an id
    const { userId } = req.params;

    // equating the data variable to the destructered todo and content
    const data = {
      todo,
      content,
      user: userId,
    };

    // equating the dataStore to Todo model
    const dataStore = new Todo(data);

    // saving of todo data
    const saveData = await dataStore.save();

    // user model
    // finding a user using the users id
    const getUser = await User.findById(userId);

    // push the todos created to the user model
    getUser.todos.push(saveData);

    //save the user in order to update it to the newstate
    await getUser.save();

    res.status(201).json(getUser);
  } catch (error) {
    console.log(error.message);
  }
};

// no longer in use
// fetching of all todo information
// const fetchAllTodo = async (req, res) => {
//   try {
//     const todos = await Todo.find();

//     // setting the status code
//     res.status(200).json(todos);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetching a particular todo information using the its id
const fetchSingleTodo = async (req, res) => {
  try {
    //  destructing the id
    const { id } = req.params;

    const todo = await Todo.findById(id);

    // setting the status code
    res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
  }
};

// deleting the todo application
const deleteTodo = async (req, res) => {
  try {
    //  destructing the id in the todos
    const { id } = req.params;

    // destructing the id in the user
    const { userId } = req.params;

    const todo = await Todo.findOneAndDelete(id); // this delete the todo within the todo model

    // finding the user of the todo created using the user id
    const user = await User.findById(userId);

    // fitering through the user model
    user.todos.filter((filteration) => {
      // if filteration.valueOf === to the todos id
      if (filteration.valueOf() === id) {
        // getting the index of the todos
        let getIndex = user.todos.indexOf(filteration.valueOf());

        // delete the todos within user object by splicing it starting with its index and the number of items to splice which is one
        user.todos.splice(getIndex, 1);

        // after deletion of the todos within the user save the user data
        user.save();
      }

      res.status(200).json(`${todo} has been deleted successfully`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// updating the status of the todo
const updateTodo = async (req, res) => {
  try {
    // destructing of the status
    const { status } = req.body;

    const data = {
      status,
    };

    // updating the todo status based on the todo id
    const updateTodo = await Todo.updateOne({ _id: req.params.id }, data);

    res.status(200).json("status updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};

// exportation of function declared
module.exports = {
  addTodo,
  fetchSingleTodo,
  deleteTodo,
  updateTodo,
};
