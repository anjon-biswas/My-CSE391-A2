document.addEventListener("DOMContentLoaded", function () {
    // ------------------ Fortune Generator ------------------
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

    document.getElementById("fortune-box").innerText =
        fortunes[Math.floor(Math.random() * fortunes.length)];

    window.changeAll = function (set) {
        const fortuneBox = document.getElementById("fortune-box");

        const colorSets = {
            set1: {
                fontColor: "#ffffff",
                bgColor: "#ff595e",
                borderColor: "#ff0000",
                fontFamily: "Courier New, monospace"
            },
            set2: {
                fontColor: "#f1faee",
                bgColor: "#1982c4",
                borderColor: "#023047",
                fontFamily: "Arial, sans-serif"
            },
            set3: {
                fontColor: "#1d3557",
                bgColor: "#8ac926",
                borderColor: "#2a9d8f",
                fontFamily: "Georgia, serif"
            },
            set4: {
                fontColor: "#000000",
                bgColor: "#ffca3a",
                borderColor: "#fb8500",
                fontFamily: "Verdana, sans-serif"
            }
        };

        const style = colorSets[set];
        fortuneBox.style.color = style.fontColor;
        fortuneBox.style.backgroundColor = style.bgColor;
        fortuneBox.style.border = `2px solid ${style.borderColor}`;
        fortuneBox.style.fontFamily = style.fontFamily;
    };

    // ------------------ Stopwatch ------------------
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
            }, 1000);
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

    // ------------------ To-Do List ------------------
    function loadTasks() {
        let tasks = localStorage.getItem("tasks");
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

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
        if (taskInput.value.trim() === "") return;
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
        taskInput.value = "";
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

    loadTasks();
});
