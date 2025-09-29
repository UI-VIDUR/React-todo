import { useEffect, useState } from "react";
import StackedLists from "./components/StackedLists";
import SelectMenu from "./components/SelectMenu";

function App() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const [filteredTodos, setFilteredTodos] = useState(todos);

  const filterOptions = [
    {
      id: 1,
      label: "All",
      value: "all"
    },
    {
      id: 2,
      label: "Completed",
      value: "completed"
    },
    {
      id: 3,
      label: "Pending",
      value: "pending"
    }
  ]

  const [filterDropDownValue, setFilterDropdownValue] = useState(filterOptions[0])


  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.title.trim() || !formData.description.trim()){
      alert('form cannot be empty');
      return;
    }

    let updatedTodos;

    if(editingIndex !== null){
      updatedTodos = todos.map((todo, index) => index === editingIndex ? formData : todo)
      setEditingIndex(null)
    }else{
      updatedTodos = [...todos, formData];
    }

    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setFormData({
      title: "",
      description: "",
      completed: false
    })
  }

  const deleteTodo = (indextoDelete) => {
    const updatedTodos = todos.filter((_, index) => {return index !== indextoDelete })
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const editTodo = (indexToEdit) => {
    const todo = todos[indexToEdit];
    setEditingIndex(indexToEdit)
    setFormData(todo)
  }

  const markComplete = (indexToMarkComplete) => {
    const updatedTodos = todos.map((todo, index) => index === indexToMarkComplete ? {...todo, completed: !todo.completed} : todo);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const searchResults = (e) => {
    const value = e.target.value.toLowerCase();

    if(!value.trim()){
      setFilteredTodos(todos);
      return;
    }

    const search = todos.filter((todo) => todo.title.toLowerCase().includes(value) || todo.description.toLowerCase().includes(value));
    setFilteredTodos(search);
  }

  const onFilterChange = (selectedOption) => {
    const value = selectedOption.value;

    if(value === "all"){
      setFilteredTodos(todos);
    } else if(value === "completed"){
      setFilteredTodos(todos.filter((todo) => todo.completed));
    } else if(value === "pending"){
      setFilteredTodos(todos.filter((todo) => !todo.completed))
    }

    setFilterDropdownValue(selectedOption)
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilteredTodos(todos);
  }, [todos])


  return (
    <>
      <div className="py-12">
        <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg border border-gray-200 p-8 flex flex-col gap-4 max-w-md sticky top-12">
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="title">Todo title</label>
              <input type="text" name="title" className="bg-white p-2 rounded-md border border-gray-100" value={formData.title} onChange={handleOnchange} />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="description">Todo description</label>
              <textarea type="text" name="description" className="bg-white p-2 rounded-md border border-gray-100" value={formData.description} onChange={handleOnchange} />
            </fieldset>
            <button className="bg-black p-2 w-full rounded-md text-white">{editingIndex !== null ? 'Update Todo' : 'Add Todo'}</button>
          </form>
            <div>
              <div className="flex gap-4">
                <input type="search" name="search-todo" id="search-todo" className="outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 rounded-md py-1 px-2 w-2xs h-9" onChange={searchResults} placeholder="Search Todos" />
                <SelectMenu options={filterOptions} onChange={onFilterChange} value={filterDropDownValue} />
              </div>
              {todos && todos.length ? (
                  <StackedLists todos={filteredTodos} deleteTodo={deleteTodo} editTodo={editTodo} markComplete={markComplete} />
              ) :
                <h1 className="text-center font-bold text-xl">
                  {filterDropDownValue.value !== "all" && filteredTodos.length === 0
                    ? `No ${filterDropDownValue.label.toLowerCase()} todos`
                    : "No todos found"}
                </h1>
              }
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
