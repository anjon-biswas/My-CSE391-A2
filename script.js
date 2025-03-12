document.addEventListener("DOMContentLoaded", function () {
    // Fortune Generator
    const fortunes = [
        "You will have a great day!",
        "A surprise is coming your way.",
        "Success is in your future.",
        "Happiness will find you.",
        "Something wonderful is about to happen.",
        "You will make a valuable connection soon.",
        "Trust yourself and good things will follow.",
        "A great opportunity is ahead of you.",
        "Your kindness will be rewarded.",
        "Dream big, it will come true."
    ];
    document.getElementById("fortune-box").innerText = fortunes[Math.floor(Math.random() * fortunes.length)];

    function randomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    window.changeFontColor = function () {
        document.getElementById("fortune-box").style.color = randomColor();
    };

    window.changeBgColor = function () {
        document.getElementById("fortune-box").style.backgroundColor = randomColor();
    };

    window.changeBorderColor = function () {
        document.getElementById("fortune-box").style.borderColor = randomColor();
    };

    window.changeFontStyle = function () {
        document.getElementById("fortune-box").style.fontFamily = "Georgia, serif";
    };

    // Stopwatch
    let time = 0, timer = null;
    document.getElementById("start").addEventListener("click", function () {
        if (!timer) {
            timer = setInterval(() => {
                time += 3;
                if (time > 30) {
                    clearInterval(timer);
                    timer = null;
                    time = 30;
                }
                document.getElementById("stopwatch").innerText = time;
            }, 3000);
        }
    });
    document.getElementById("stop").addEventListener("click", function () {
        clearInterval(timer);
        timer = null;
    });
    document.getElementById("reset").addEventListener("click", function () {
        clearInterval(timer);
        timer = null;
        time = 0;
        document.getElementById("stopwatch").innerText = time;
    });

    // To-Do List
    function loadTasks() {
        let tasks = localStorage.getItem("tasks");
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear existing tasks
        if (tasks) {
            tasks = tasks.split("|");
            tasks.forEach(task => {
                let parts = task.split(",");
                let li = document.createElement("li");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = parts[1] === "true";
                checkbox.onclick = saveTasks;
                let textNode = document.createTextNode(" " + parts[0] + " ");
                let button = document.createElement("button");
                button.innerText = "Delete";
                button.onclick = function () {
                    li.remove();
                    saveTasks();
                };
                li.appendChild(checkbox);
                li.appendChild(textNode);
                li.appendChild(button);
                taskList.appendChild(li);
            });
        }
    }

    window.addTask = function () {
        let taskInput = document.getElementById("taskInput");
        if (taskInput.value.trim() === "") return; // Don't add empty tasks
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = saveTasks;
        let textNode = document.createTextNode(" " + taskInput.value + " ");
        let button = document.createElement("button");
        button.innerText = "Delete";
        button.onclick = function () {
            li.remove();
            saveTasks();
        };
        li.appendChild(checkbox);
        li.appendChild(textNode);
        li.appendChild(button);
        document.getElementById("taskList").appendChild(li);
        saveTasks();
        taskInput.value = ""; // Clear the input field after adding the task
    };

    function saveTasks() {
        let taskList = document.getElementById("taskList").children;
        let tasks = [];
        for (let i = 0; i < taskList.length; i++) {
            let taskText = taskList[i].childNodes[1].nodeValue.trim();
            let taskStatus = taskList[i].childNodes[0].checked;
            tasks.push(taskText + "," + taskStatus);
        }
        localStorage.setItem("tasks", tasks.join("|"));
    }

    loadTasks(); // Load the tasks when the page loads
});
