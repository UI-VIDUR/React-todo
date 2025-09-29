export default function StackedLists({todos, deleteTodo, editTodo, markComplete}) {

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {todos?.map((todo, index) => (
        <li key={`${todo}-${index}`} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{todo.title}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{todo.description}</p>
              <div className="flex gap-2">
                <button className="bg-red-500 text-white text-xs rounded-md py-1 px-4" onClick={() => deleteTodo(index)}>Delete</button>
                <button className="bg-gray-900 text-white text-xs rounded-md py-1 px-4" onClick={() => editTodo(index)}>Edit</button>
                <fieldset className="flex items-center gap-1">
                    <input type="checkbox" name="mark-complete" id={`mark-complete-${index}`} checked={todo.completed} onChange={() => markComplete(index)} />
                    <label htmlFor={`mark-complete-${index}`}>Mark as Complete</label>
                </fieldset>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
