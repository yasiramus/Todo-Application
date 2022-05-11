  // helper method to add object/items to an array/todolist
  // const AddItems = (event) => {
  //   event.preventDefault();

  //   const newTodos = {
  //     id: todos.length + 1,
  //     todo: input,
  //     content:textarea,
  //     status: "Pending",
  //   };

  //   setTodos([...todos, newTodos]);
  //   // console.log(newTodos);

  //   // clearing the input field after the user submit data
  //   setInput("");
  //   setTextarea('');
  // };


   //deletion of todo using its id
  // const DeleteTodo = (id) => {
  //   // filter returns array data type
  //   const deletion = todos.filter((todo) => todo.id !== id);

  //   setTodos([...deletion]);
  // }

    //updating a todo list
    // const update = (id) => {
    //   const mapped = todos.map((item) => {
    //     return item.id === id
    //       ? { ...item, status: item.status === "pending" ? "Done" : "pending" }
    //       : { ...item };
    //   });
  
    //   setTodos([...mapped]);
    // };


        //   const newPassword = { password };

//     const user = await User.findOne({ email });
//       console.log(user);
//     const hashedPassword = await bcrypt.compare(password, newPassword )
// console.log(hashedPassword);
//       const userPassword = await User.findByIdAndUpdate( userId, { new: true }); //new means it should return a new value 
//       res.status(200).json( userPassword )
//       console.log(userPassword);
