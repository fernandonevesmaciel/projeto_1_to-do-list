 document.addEventListener('DOMContentLoaded', () => {
            // Seletores de elementos do DOM
            const taskInput = document.getElementById('taskInput');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskList = document.getElementById('taskList');
            const allFilter = document.getElementById('allFilter');
            const activeFilter = document.getElementById('activeFilter');
            const completedFilter = document.getElementById('completedFilter');

            let tasks = []; // Array para armazenar as tarefas

            // Carrega as tarefas do localStorage ao iniciar
            function loadTasks() {
                const storedTasks = localStorage.getItem('tasks');
                if (storedTasks) {
                    tasks = JSON.parse(storedTasks);
                    renderTasks();
                }
            }

            // Salva as tarefas no localStorage
            function saveTasks() {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            // Renderiza as tarefas na tela
            function renderTasks(filter = 'all') {
                taskList.innerHTML = ''; // Limpa a lista antes de renderizar
                const filteredTasks = tasks.filter(task => {
                    if (filter === 'active') return !task.completed;
                    if (filter === 'completed') return task.completed;
                    return true;
                });

                filteredTasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-gray-50', 'rounded-lg', 'shadow-sm', 'transition-shadow', 'duration-200', 'hover:shadow-md');
                    if (task.completed) {
                        li.classList.add('completed');
                    }

                    const taskText = document.createElement('span');
                    taskText.textContent = task.text;
                    taskText.classList.add('flex-1', 'cursor-pointer');
                    
                    const actionsContainer = document.createElement('div');
                    actionsContainer.classList.add('flex', 'items-center', 'space-x-2', 'ml-4');
                    
                    const completeButton = document.createElement('button');
                    completeButton.textContent = 'concluir';
                    completeButton.classList.add('px-3', 'py-1', 'bg-green-500', 'text-white', 'rounded-lg', 'text-xs', 'hover:bg-green-600', 'transition-colors', 'duration-200');
                    completeButton.addEventListener('click', () => toggleTaskCompleted(task.id));

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Remover';
                    deleteButton.classList.add('px-3', 'py-1', 'bg-red-500', 'text-white', 'rounded-lg', 'text-xs', 'hover:bg-red-600', 'transition-colors', 'duration-200');
                    deleteButton.addEventListener('click', () => deleteTask(task.id));

                    li.appendChild(taskText);
                    actionsContainer.appendChild(completeButton);
                    actionsContainer.appendChild(deleteButton);
                    li.appendChild(actionsContainer);
                    taskList.appendChild(li);
                });
            }

            // Adiciona uma nova tarefa
            function addTask() {
                const text = taskInput.value.trim();
                if (text) {
                    const newTask = {
                        id: Date.now(), // ID único
                        text: text,
                        completed: false
                    };
                    tasks.push(newTask);
                    saveTasks();
                    renderTasks();
                    taskInput.value = ''; // Limpa o input
                }
            }

            // Marca uma tarefa como concluída ou pendente
            function toggleTaskCompleted(id) {
                const task = tasks.find(t => t.id === id);
                if (task) {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTasks(allFilter.classList.contains('bg-blue-500') ? 'all' : (activeFilter.classList.contains('bg-blue-500') ? 'active' : 'completed'));
                }
            }

            // Deleta uma tarefa
            function deleteTask(id) {
                tasks = tasks.filter(task => task.id !== id);
                saveTasks();
                renderTasks(allFilter.classList.contains('bg-blue-500') ? 'all' : (activeFilter.classList.contains('bg-blue-500') ? 'active' : 'completed'));
            }

            // Eventos
            addTaskBtn.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addTask();
                }
            });

            // Eventos para os filtros
            allFilter.addEventListener('click', () => {
                allFilter.classList.replace('bg-gray-200', 'bg-blue-500');
                allFilter.classList.replace('text-gray-700', 'text-white');
                activeFilter.classList.replace('bg-blue-500', 'bg-gray-200');
                activeFilter.classList.replace('text-white', 'text-gray-700');
                completedFilter.classList.replace('bg-blue-500', 'bg-gray-200');
                completedFilter.classList.replace('text-white', 'text-gray-700');
                renderTasks('all');
            });

            activeFilter.addEventListener('click', () => {
                activeFilter.classList.replace('bg-gray-200', 'bg-blue-500');
                activeFilter.classList.replace('text-gray-700', 'text-white');
                allFilter.classList.replace('bg-blue-500', 'bg-gray-200');
                allFilter.classList.replace('text-white', 'text-gray-700');
                completedFilter.classList.replace('bg-blue-500', 'bg-gray-200');
                completedFilter.classList.replace('text-white', 'text-gray-700');
                renderTasks('active');
            });

            completedFilter.addEventListener('click', () => {
                completedFilter.classList.replace('bg-gray-200', 'bg-blue-500');
                completedFilter.classList.replace('text-gray-700', 'text-white');
                allFilter.classList.replace('bg-blue-500', 'bg-gray-200');
                allFilter.classList.replace('text-white', 'text-gray-700');
                activeFilter.classList.replace('bg-blue-500', 'bg-gray-200');
                activeFilter.classList.replace('text-white', 'text-gray-700');
                renderTasks('completed');
            });

            // Carrega as tarefas inicialmente
            loadTasks();
        });