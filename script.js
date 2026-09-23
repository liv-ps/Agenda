// ==========================================
// AGENDA
// ==========================================


// ==========================================
// ELEMENTOS DO CALENDÁRIO
// ==========================================

const calendar =
    document.getElementById("calendar");

const monthTitle =
    document.getElementById("monthTitle");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");


// ==========================================
// MENU DO MÊS
// ==========================================

const monthMenuButton =
    document.getElementById("monthMenuButton");

const monthMenu =
    document.getElementById("monthMenu");

const deleteMonthButton =
    document.getElementById("deleteMonthButton");


// ==========================================
// ELEMENTOS DA PÁGINA DE TAREFAS
// ==========================================

const calendarPage =
    document.getElementById("calendarPage");

const tasksPage =
    document.getElementById("tasksPage");

const backToCalendar =
    document.getElementById("backToCalendar");

const previousDay =
    document.getElementById("previousDay");

const nextDay =
    document.getElementById("nextDay");

const currentDate =
    document.getElementById("currentDate");

const newTaskInput =
    document.getElementById("newTaskInput");

const addTaskButton =
    document.getElementById("addTaskButton");

const activeTasks =
    document.getElementById("activeTasks");

const emptyMessage =
    document.getElementById("emptyMessage");

const toggleCompleted =
    document.getElementById("toggleCompleted");

const completedTasks =
    document.getElementById("completedTasks");

const completedCount =
    document.getElementById("completedCount");

const completedArrow =
    document.getElementById("completedArrow");


// ==========================================
// CONFIGURAÇÕES
// ==========================================

const STORAGE_KEY = "agendaTasks";

const MIN_YEAR = 2026;

const MAX_YEAR = 2030;


// ==========================================
// DATA ATUAL
// ==========================================

const today = new Date();


// ==========================================
// DATA SELECIONADA
// ==========================================

let selectedDate =
    new Date();


// Se a data atual estiver fora do período
// da agenda

if (
    selectedDate.getFullYear() < MIN_YEAR ||
    selectedDate.getFullYear() > MAX_YEAR
) {

    selectedDate =
        new Date(
            2026,
            0,
            1
        );
}


// ==========================================
// MÊS EXIBIDO
// ==========================================

let displayedYear =
    selectedDate.getFullYear();

let displayedMonth =
    selectedDate.getMonth();


// ==========================================
// TAREFAS CONCLUÍDAS
// ==========================================

let completedIsOpen = false;


// ==========================================
// FUNÇÃO PARA PEGAR AS TAREFAS
// ==========================================

function getTasks() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {

        return {};
    }


    try {

        return JSON.parse(saved);

    } catch {

        return {};
    }
}


// ==========================================
// SALVAR TAREFAS
// ==========================================

function saveTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}


// ==========================================
// CRIAR CHAVE DA DATA
// ==========================================

function getDateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


// ==========================================
// PEGAR TAREFAS DE UM DIA
// ==========================================

function getTasksForDate(date) {

    const tasks =
        getTasks();

    const key =
        getDateKey(date);


    return tasks[key] || [];
}


// ==========================================
// SALVAR TAREFAS DE UM DIA
// ==========================================

function saveTasksForDate(
    date,
    dayTasks
) {

    const tasks =
        getTasks();

    const key =
        getDateKey(date);


    tasks[key] =
        dayTasks;


    saveTasks(tasks);
}


// ==========================================
// VERIFICAR SE O MÊS JÁ PASSOU
// ==========================================

function isPastMonth(
    year,
    month
) {

    const currentYear =
        today.getFullYear();

    const currentMonth =
        today.getMonth();


    if (
        year < currentYear
    ) {

        return true;
    }


    if (
        year === currentYear &&
        month < currentMonth
    ) {

        return true;
    }


    return false;
}


// ==========================================
// ATUALIZAR VISIBILIDADE DA OPÇÃO
// ==========================================

function updateMonthMenu() {

    if (
        isPastMonth(
            displayedYear,
            displayedMonth
        )
    ) {

        deleteMonthButton.classList.remove(
            "hidden"
        );

    } else {

        deleteMonthButton.classList.add(
            "hidden"
        );
    }
}


// ==========================================
// CALENDÁRIO
// ==========================================

function renderCalendar() {

    calendar.innerHTML = "";


    // ======================================
    // NOME DO MÊS
    // ======================================

    const dateForTitle =
        new Date(
            displayedYear,
            displayedMonth,
            1
        );


    const monthName =
        dateForTitle.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    monthTitle.textContent =
        monthName.charAt(0).toUpperCase() +
        monthName.slice(1);


    // ======================================
    // ATUALIZAR MENU
    // ======================================

    updateMonthMenu();


    // ======================================
    // PRIMEIRO DIA DO MÊS
    // ======================================

    const firstDay =
        new Date(
            displayedYear,
            displayedMonth,
            1
        );


    // ======================================
    // QUANTIDADE DE DIAS
    // ======================================

    const daysInMonth =
        new Date(
            displayedYear,
            displayedMonth + 1,
            0
        ).getDate();


    // ======================================
    // DIA DA SEMANA
    // ======================================

    const startingDay =
        firstDay.getDay();


    // ======================================
    // ESPAÇOS ANTES DO PRIMEIRO DIA
    // ======================================

    for (
        let i = 0;
        i < startingDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "calendar-day empty";


        calendar.appendChild(
            empty
        );
    }


    // ======================================
    // CRIAR DIAS
    // ======================================

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                displayedYear,
                displayedMonth,
                day
            );


        const dayElement =
            document.createElement(
                "div"
            );


        dayElement.className =
            "calendar-day";


        // ==================================
        // NÚMERO DO DIA
        // ==================================

        const number =
            document.createElement(
                "span"
            );


        number.textContent =
            day;


        dayElement.appendChild(
            number
        );


        // ==================================
        // VERIFICAR SE É HOJE
        // ==================================

        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();


        if (isToday) {

            dayElement.classList.add(
                "today"
            );
        }


        // ==================================
        // VERIFICAR TAREFAS
        // ==================================

        const dayTasks =
            getTasksForDate(
                date
            );


        if (
            dayTasks.length > 0
        ) {

            const indicator =
                document.createElement(
                    "span"
                );


            indicator.className =
                "task-indicator";


            indicator.textContent =
                "•";


            dayElement.appendChild(
                indicator
            );
        }


        // ==================================
        // CLICAR NO DIA
        // ==================================

        dayElement.addEventListener(
            "click",
            function () {

                selectedDate =
                    new Date(date);


                openTasksPage();
            }
        );


        calendar.appendChild(
            dayElement
        );
    }
}


// ==========================================
// MÊS ANTERIOR
// ==========================================

previousMonth.addEventListener(
    "click",
    function () {

        displayedMonth--;


        if (
            displayedMonth < 0
        ) {

            displayedMonth = 11;

            displayedYear--;
        }


        if (
            displayedYear < MIN_YEAR
        ) {

            displayedYear =
                MIN_YEAR;

            displayedMonth =
                0;
        }


        closeMonthMenu();

        renderCalendar();
    }
);


// ==========================================
// PRÓXIMO MÊS
// ==========================================

nextMonth.addEventListener(
    "click",
    function () {

        displayedMonth++;


        if (
            displayedMonth > 11
        ) {

            displayedMonth = 0;

            displayedYear++;
        }


        if (
            displayedYear > MAX_YEAR
        ) {

            displayedYear =
                MAX_YEAR;

            displayedMonth =
                11;
        }


        closeMonthMenu();

        renderCalendar();
    }
);


// ==========================================
// ABRIR / FECHAR MENU
// ==========================================

monthMenuButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();


        monthMenu.classList.toggle(
            "hidden"
        );
    }
);


// ==========================================
// FECHAR MENU AO CLICAR FORA
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            !monthMenu.contains(event.target) &&
            event.target !== monthMenuButton
        ) {

            closeMonthMenu();
        }
    }
);


// ==========================================
// FECHAR MENU
// ==========================================

function closeMonthMenu() {

    monthMenu.classList.add(
        "hidden"
    );
}


// ==========================================
// EXCLUIR MÊS
// ==========================================

deleteMonthButton.addEventListener(
    "click",
    function () {

        // Segurança:
        // não permite apagar mês atual
        // ou mês futuro.

        if (
            !isPastMonth(
                displayedYear,
                displayedMonth
            )
        ) {

            return;
        }


        const monthDate =
            new Date(
                displayedYear,
                displayedMonth,
                1
            );


        const monthName =
            monthDate.toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        const confirmation =
            confirm(
                `Excluir ${monthName}?\n\nTodas as tarefas deste mês serão apagadas permanentemente.`
            );


        if (!confirmation) {

            return;
        }


        // ==================================
        // PEGAR TODAS AS TAREFAS
        // ==================================

        const tasks =
            getTasks();


        // ==================================
        // CHAVES DO MÊS
        // ==================================

        const prefix =
            `${displayedYear}-${String(
                displayedMonth + 1
            ).padStart(2, "0")}-`;


        // ==================================
        // APAGAR TODAS AS TAREFAS
        // DESSE MÊS
        // ==================================

        Object.keys(tasks).forEach(
            key => {

                if (
                    key.startsWith(prefix)
                ) {

                    delete tasks[key];
                }
            }
        );


        // ==================================
        // SALVAR NOVAMENTE
        // ==================================

        saveTasks(tasks);


        // ==================================
        // IR PARA O MÊS ANTERIOR
        // ==================================

        displayedMonth--;


        if (
            displayedMonth < 0
        ) {

            displayedMonth = 11;

            displayedYear--;
        }


        // ==================================
        // NÃO PASSAR DO LIMITE
        // ==================================

        if (
            displayedYear < MIN_YEAR
        ) {

            displayedYear =
                MIN_YEAR;

            displayedMonth =
                0;
        }


        closeMonthMenu();

        renderCalendar();
    }
);


// ==========================================
// ABRIR PÁGINA DE TAREFAS
// ==========================================

function openTasksPage() {

    calendarPage.classList.add(
        "hidden"
    );


    tasksPage.classList.remove(
        "hidden"
    );


    completedIsOpen =
        false;


    completedTasks.classList.add(
        "hidden"
    );


    completedArrow.textContent =
        "▼";


    renderTasks();


    newTaskInput.focus();
}


// ==========================================
// VOLTAR PARA O CALENDÁRIO
// ==========================================

backToCalendar.addEventListener(
    "click",
    function () {

        tasksPage.classList.add(
            "hidden"
        );


        calendarPage.classList.remove(
            "hidden"
        );


        displayedYear =
            selectedDate.getFullYear();


        displayedMonth =
            selectedDate.getMonth();


        renderCalendar();
    }
);


// ==========================================
// MOSTRAR DATA DA TAREFA
// ==========================================

function updateCurrentDate() {

    const text =
        selectedDate.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    currentDate.textContent =
        text.charAt(0).toUpperCase() +
        text.slice(1);
}


// ==========================================
// DIA ANTERIOR
// ==========================================

previousDay.addEventListener(
    "click",
    function () {

        const newDate =
            new Date(
                selectedDate
            );


        newDate.setDate(
            newDate.getDate() - 1
        );


        if (
            newDate.getFullYear() < MIN_YEAR
        ) {

            return;
        }


        selectedDate =
            newDate;


        renderTasks();
    }
);


// ==========================================
// PRÓXIMO DIA
// ==========================================

nextDay.addEventListener(
    "click",
    function () {

        const newDate =
            new Date(
                selectedDate
            );


        newDate.setDate(
            newDate.getDate() + 1
        );


        if (
            newDate.getFullYear() > MAX_YEAR
        ) {

            return;
        }


        selectedDate =
            newDate;


        renderTasks();
    }
);


// ==========================================
// ADICIONAR TAREFA
// ==========================================

function addTask() {

    const text =
        newTaskInput.value.trim();


    if (
        text === ""
    ) {

        return;
    }


    const tasks =
        getTasksForDate(
            selectedDate
        );


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false
    };


    tasks.push(
        newTask
    );


    saveTasksForDate(
        selectedDate,
        tasks
    );


    newTaskInput.value =
        "";


    renderTasks();

    renderCalendar();


    newTaskInput.focus();
}


// ==========================================
// BOTÃO +
// ==========================================

addTaskButton.addEventListener(
    "click",
    addTask
);


// ==========================================
// ENTER
// ==========================================

newTaskInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            addTask();
        }
    }
);


// ==========================================
// RENDERIZAR TAREFAS
// ==========================================

function renderTasks() {

    updateCurrentDate();


    activeTasks.innerHTML =
        "";


    completedTasks.innerHTML =
        "";


    const tasks =
        getTasksForDate(
            selectedDate
        );


    const active =
        tasks.filter(
            task =>
                !task.completed
        );


    const completed =
        tasks.filter(
            task =>
                task.completed
        );


    // ======================================
    // TAREFAS ATIVAS
    // ======================================

    active.forEach(
        task => {

            activeTasks.appendChild(
                createTaskElement(
                    task
                )
            );
        }
    );


    // ======================================
    // TAREFAS CONCLUÍDAS
    // ======================================

    completed.forEach(
        task => {

            completedTasks.appendChild(
                createTaskElement(
                    task
                )
            );
        }
    );


    // ======================================
    // MENSAGEM
    // ======================================

    if (
        active.length === 0
    ) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";
    }


    // ======================================
    // CONTADOR
    // ======================================

    completedCount.textContent =
        completed.length;
}


// ==========================================
// CRIAR TAREFA
// ==========================================

function createTaskElement(task) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "task-item";


    if (
        task.completed
    ) {

        item.classList.add(
            "completed"
        );
    }


    // ======================================
    // CHECKBOX
    // ======================================

    const checkbox =
        document.createElement(
            "input"
        );


    checkbox.type =
        "checkbox";


    checkbox.className =
        "task-checkbox";


    checkbox.checked =
        task.completed;


    checkbox.addEventListener(
        "change",
        function () {

            toggleTask(
                task.id
            );
        }
    );


    // ======================================
    // TEXTO
    // ======================================

    const text =
        document.createElement(
            "span"
        );


    text.className =
        "task-text";


    text.textContent =
        task.text;


    // ======================================
    // BOTÃO EXCLUIR
    // ======================================

    const deleteButton =
        document.createElement(
            "button"
        );


    deleteButton.type =
        "button";


    deleteButton.className =
        "delete-task";


    deleteButton.textContent =
        "✕";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteTask(
                task.id
            );
        }
    );


    // ======================================
    // ADICIONAR ELEMENTOS
    // ======================================

    item.appendChild(
        checkbox
    );


    item.appendChild(
        text
    );


    item.appendChild(
        deleteButton
    );


    return item;
}


// ==========================================
// CONCLUIR / DESCONCLUIR
// ==========================================

function toggleTask(taskId) {

    const tasks =
        getTasksForDate(
            selectedDate
        );


    const task =
        tasks.find(
            item =>
                item.id === taskId
        );


    if (!task) {

        return;
    }


    task.completed =
        !task.completed;


    saveTasksForDate(
        selectedDate,
        tasks
    );


    renderTasks();

    renderCalendar();
}


// ==========================================
// EXCLUIR TAREFA
// ==========================================

function deleteTask(taskId) {

    const tasks =
        getTasksForDate(
            selectedDate
        );


    const newTasks =
        tasks.filter(
            task =>
                task.id !== taskId
        );


    saveTasksForDate(
        selectedDate,
        newTasks
    );


    renderTasks();

    renderCalendar();
}


// ==========================================
// ABRIR / FECHAR CONCLUÍDAS
// ==========================================

toggleCompleted.addEventListener(
    "click",
    function () {

        completedIsOpen =
            !completedIsOpen;


        if (
            completedIsOpen
        ) {

            completedTasks.classList.remove(
                "hidden"
            );


            completedArrow.textContent =
                "▲";

        } else {

            completedTasks.classList.add(
                "hidden"
            );


            completedArrow.textContent =
                "▼";
        }
    }
);


// ==========================================
// INICIAR CALENDÁRIO
// ==========================================

renderCalendar();
