const API = {
  getTodos: async (setTodos) => {
    return await fetch("https://61498bf2035b3600175ba32f.mockapi.io/todo").then(
      (res) => res.json()
    );
  },

  addTodo: async (title, description) => {
    return await fetch("https://61498bf2035b3600175ba32f.mockapi.io/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  updateStatus: async (element) => {
    return await fetch(
      `https://61498bf2035b3600175ba32f.mockapi.io/todo/${element.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ completed: !element.completed }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  },

  deleteTodo: async (todo) => {
    return await fetch(
      `https://61498bf2035b3600175ba32f.mockapi.io/todo/${todo.id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
  },

  editTodo: async (row, changeTitle, changeDescription) => {
    return await fetch(
      `https://61498bf2035b3600175ba32f.mockapi.io/todo/${row.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: changeTitle,
          description: changeDescription,
        }),
      }
    ).then((res) => res.json());
  },
};

export default API;
