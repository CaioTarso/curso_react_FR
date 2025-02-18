import { useEffect, useState } from 'react'
import  Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Title from './components/Title';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

useEffect(() => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks])

useEffect(() => {
//   const fetchtasks = async () => {
//     // chamar a api
//     const response = await fetch(
//       'https://jsonplaceholder.typicode.com/todos?_limit=10', 
//       {
//       method: 'GET',
//     }
// );
//      // Pegar os dados que a api retorna
//     const data = await response.json();
    
//     // armazenar os dados no estado
//     setTasks(data);

//   };
//    // Estudo de caso: chamada de uma API
//   // fetchTasks();
}, []);
   
   function onTaskClick(taskId){
     const newTasks = tasks.map((task) => {
       // Preciso atualizar essa tarefa
       if(task.id === taskId){
         return{...task, isCompleted: !task.isCompleted}
       }
       // não preciso atualizar essa tarefa 
        return task;

     });
     setTasks(newTasks);
    }

    function onDeleteTaskClick(taskId) {
       const newTasks = tasks.filter((task) => task.id !== taskId);
       setTasks(newTasks);
    }

    function onAddTaskSubmit(title, description) {
      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
    }

  return (
    <div className='w-screen h-screen bg-slate-500 flex justify-center p-6'>
      <div className='w-[500px] space-y-4'>
       <Title>
        Gerenciador de Tarefas
       </Title>
       <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
       <Tasks tasks={tasks} 
       onTaskClick={onTaskClick} 
       onDeleteTaskClick={onDeleteTaskClick} /> 
      </div>
    </div>
  )

}

export default App