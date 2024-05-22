import { v4 as uuidV4 } from 'uuid'
// console.log(uuidV4())
type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title")

const task: Task[] = loadTask()
task.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return // optional chaining if found then print value if not then undefined
  const Newtask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  task.push(Newtask)

  addListItem(Newtask)
  input.value = ""
})
function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    // console.log(task)
    saveTask()
  })
  item.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    task.completed = checkbox.checked;
    saveTask();
  });
  saveTask()

  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTask() {
  localStorage.setItem("TASK", JSON.stringify(task))
}

function loadTask(): Task[] {
  const taskjson = localStorage.getItem("TASK")
  // if (taskjson == null) return []

  if (taskjson == null) return []
  return JSON.parse(taskjson)
}