let goals = loadGoals();

let availableMoney =
loadAvailableMoney();

let paydays =
loadPaydays();

const exportBtn =
document.getElementById(
"exportBtn"
);

const importBtn =
document.getElementById(
"importBtn"
);

const importFile =
document.getElementById(
"importFile"
);

const goalModal =
document.getElementById(
"goalModal"
);


const moneyModal =
document.getElementById(
"moneyModal"
);

const availableModal =
document.getElementById(
    "availableModal"
);

const goalName =
document.getElementById(
"goalName"
);


const goalTarget =
document.getElementById(
"goalTarget"
);


const goalDate =
document.getElementById(
"goalDate"
);


const saveGoalBtn =
document.getElementById(
"saveGoalBtn"
);

const cancelGoalBtn =
document.getElementById(
"cancelGoalBtn"
);

const moneyAmount =
document.getElementById(
"moneyAmount"
);

const addAvailableBtn =
document.getElementById(
"addAvailableBtn"
);

const confirmMoneyBtn =
document.getElementById(
"confirmMoneyBtn"
);

const addPaydayBtn =
document.getElementById(
"addPaydayBtn"
);


const paydayModal =
document.getElementById(
"paydayModal"
);


const paydayName =
document.getElementById(
"paydayName"
);

const paydayDate =
document.getElementById(
"paydayDate"
);

const savePaydayBtn =
document.getElementById(
"savePaydayBtn"
);

const cancelPaydayBtn =
document.getElementById(
"cancelPaydayBtn"
);

const cancelMoneyBtn =
document.getElementById(
"cancelMoneyBtn"
);

let editingGoalId = null;

let currentMoneyGoal = null;

let movementType = null;

const availableMoneyElement =
document.getElementById(
    "availableMoney"
);

const availableInput =
document.getElementById("availableInput");

const saveAvailableBtn =
document.getElementById("saveAvailableBtn");

const cancelAvailableBtn =
document.getElementById("cancelAvailableBtn");

const goalsContainer =
document.getElementById("goalsContainer");

const searchInput =
document.getElementById("searchInput");

const totalSaved =
document.getElementById("totalSaved");

const totalGoal =
document.getElementById("totalGoal");

const totalPending =
document.getElementById("totalPending");

const activeGoals =
document.getElementById("activeGoals");

const completedGoals =
document.getElementById("completedGoals");

const nextGoal =
document.getElementById("nextGoal");

const weeklySaved =
document.getElementById("weeklySaved");

const monthlySaved =
document.getElementById("monthlySaved");

const bestGoal =
document.getElementById("bestGoal");

const worstGoal =
document.getElementById("worstGoal");

const themeToggle =
document.getElementById("themeToggle");

const newGoalBtn =
document.getElementById("newGoalBtn");

themeToggle.addEventListener(
"click",
toggleTheme
);

newGoalBtn.addEventListener(
"click",
createGoal
);

addAvailableBtn
.addEventListener(

"click",

registerAvailableMoney

);

addPaydayBtn.addEventListener(
    "click",
    ()=>{
        paydayModal.classList.remove(
            "hidden"
        );
    }
);

cancelPaydayBtn
.addEventListener(

"click",

()=>{

    paydayModal
    .classList
    .add(
        "hidden"
    );

}
);

savePaydayBtn
.addEventListener(

"click",

()=>{

    if(
        !paydayDate.value
    ) return;

    paydays.push({

        id:
        Date.now(),

        title:
        paydayName.value ||
        "Día de Pago",

        date:
        paydayDate.value

    });

    savePaydays(
        paydays
    );

    paydayModal
    .classList
    .add(
        "hidden"
    );

    renderAll();

}
);

searchInput.addEventListener(
"input",
renderGoals
);

exportBtn.addEventListener(
"click",
exportData
);

importBtn.addEventListener(
"click",
()=>{

importFile.click();

}
);

importFile.addEventListener(
"change",
importData
);

saveGoalBtn.addEventListener(
"click",
saveGoal
);

saveAvailableBtn
.addEventListener(

"click",

()=>{

    const amount =

    Number(
        availableInput.value
    );

    if(
        amount <= 0
    ) return;

    availableMoney += amount;

    saveAvailableMoney(
        availableMoney
    );

    availableModal
    .classList
    .add(
        "hidden"
    );

    renderAll();

}
);

cancelAvailableBtn
.addEventListener(

"click",

()=>{

    availableModal
    .classList
    .add(
        "hidden"
    );

}
);

cancelGoalBtn.addEventListener(
"click",
()=>{

goalModal
.classList
.add(
"hidden"
);

}
);

confirmMoneyBtn.addEventListener(
"click",
()=>{

    const amount =
    Number(
        moneyAmount.value
    );

    if(
        !amount ||
        amount <= 0
    )
    return;

    const goal =
    goals.find(
        g =>
        g.id ===
        currentMoneyGoal
    );

    if(
        movementType ===
        "add"
    ){

        if(
            amount >
            availableMoney
        ){

            alert(
                "No tienes suficiente dinero disponible."
            );

            return;

        }

        availableMoney -= amount;

        saveAvailableMoney(
            availableMoney
        );

        goal.saved += amount;

        goal.history.unshift({

            amount,

            date:
            new Date()
            .toLocaleString()

        });

    }

    if(
        movementType ===
        "remove"
    ){

        if(
            amount >
            goal.saved
        ){

            alert(
                "No puedes retirar más de lo ahorrado."
            );

            return;

        }

        goal.saved -= amount;

        availableMoney += amount;

        saveAvailableMoney(
            availableMoney
        );

        goal.history.unshift({

            amount:-amount,

            date:
            new Date()
            .toLocaleString()

        });

    }

    saveGoals(goals);

    moneyModal
    .classList
    .add(
        "hidden"
    );

    renderAll();

});

cancelMoneyBtn
.addEventListener(
"click",
()=>{

moneyModal
.classList
.add(
"hidden"
);

}
);

function saveGoal(){

const name =
goalName.value.trim();

const target =
Number(
goalTarget.value
);

const date =
goalDate.value;

if(
!name ||
!target ||
!date
)
return;

if(editingGoalId){

const goal =
goals.find(
g =>
g.id ===
editingGoalId
);

goal.name =
name;

goal.target =
target;

goal.date =
date;

}else{

goals.push({

id:
Date.now(),

name,

target,

saved:0,

date,

history:[]

});

}

saveGoals(goals);

goalModal
.classList
.add(
"hidden"
);

renderAll();

}

function registerAvailableMoney(){

    availableInput.value = "";

    availableModal
    .classList
    .remove(
        "hidden"
    );

}

function money(value){

return new Intl.NumberFormat(
"es-MX",
{
style:"currency",
currency:"MXN"
}
).format(value);

}

function createGoal(){

editingGoalId = null;

goalName.value = "";

goalTarget.value = "";

goalDate.value = "";

document
.getElementById(
"modalTitle"
)
.textContent =
"Nueva Meta";

goalModal
.classList
.remove("hidden");

}

function deleteGoal(id){

const goal =
goals.find(
g =>
g.id === id
);

if(
!window.confirm(
`Eliminar ${goal.name}?`
)
)
return;

goals =
goals.filter(
g =>
g.id !== id
);

saveGoals(goals);

renderAll();

}

function editGoal(id){

const goal =
goals.find(
g =>
g.id === id
);

editingGoalId =
id;

goalName.value =
goal.name;

goalTarget.value =
goal.target;

goalDate.value =
goal.date;

document
.getElementById(
"modalTitle"
)
.textContent =
"Editar Meta";

goalModal
.classList
.remove(
"hidden"
);

}

function addMoney(id){

const amount =
Number(
prompt(
"Cantidad a agregar"
)
);

if(
!amount ||
amount <= 0
) return;

const goal =
goals.find(
g => g.id === id
);

goal.saved += amount;

goal.history.unshift({

amount,

date:
new Date()
.toLocaleString()

});

saveGoals(goals);

renderAll();

}

function calculateDashboard(){

const totalSavedValue =
goals.reduce(
(sum,g)=>
sum+g.saved,
0
);

const totalGoalValue =
goals.reduce(
(sum,g)=>
sum+g.target,
0
);

const completed =
goals.filter(
g =>
g.saved >= g.target
).length;

availableMoneyElement.textContent =
money(availableMoney);

totalSaved.textContent =
money(totalSavedValue);

totalGoal.textContent =
money(totalGoalValue);

totalPending.textContent =
money(
totalGoalValue -
totalSavedValue
);

activeGoals.textContent =
goals.length;

completedGoals.textContent =
completed;

const upcoming =
[...goals]

.filter(
g =>
new Date(g.date)
>= new Date()
)

.sort(
(a,b)=>
new Date(a.date)
-
new Date(b.date)
)[0];

nextGoal.textContent =
upcoming
? upcoming.name
: "-";

}

function openMoneyModal(
id,
type
){

currentMoneyGoal =
id;

movementType =
type;

moneyAmount.value =
"";

document
.getElementById(
"moneyTitle"
)
.textContent =

type === "add"
?
"Agregar Dinero"
:
"Retirar Dinero";

moneyModal
.classList
.remove(
"hidden"
);

}

function renderGoals(){

const filter =
searchInput.value
.toLowerCase();

const filtered =
goals

.filter(
goal =>
goal.name
.toLowerCase()
.includes(filter)
)

.sort(
(a,b)=>
new Date(a.date)
-
new Date(b.date)
);

goalsContainer.innerHTML =
"";

if(!filtered.length){

goalsContainer.innerHTML =
`
<div class="empty">
No hay metas registradas
</div>
`;

return;

}

filtered.forEach(goal=>{

const percent =
Math.min(
(goal.saved/goal.target)*100,
100
);

const daysLeft =
Math.ceil(
(
new Date(goal.date)
-
new Date()
)
/
86400000
);

const remaining =
goal.target -
goal.saved;

const perDay =
daysLeft > 0
?
remaining /
daysLeft
:
remaining;

const perWeek =
perDay * 7;

const perMonth =
perDay * 30;

const historyHTML =
goal.history
.map(item=>`

<div class="history-item">

<span>
${item.date}
</span>

<span>
${money(item.amount)}
</span>

</div>

`)
.join("");

goalsContainer.innerHTML +=

`
<div class="goal-card">

<div class="goal-header">

<h2>
${goal.name}
</h2>

<h3>
${money(goal.saved)}
/
${money(goal.target)}
</h3>

</div>

<div class="progress">

<div
class="progress-fill"
style="
width:${percent}%"
>

</div>

</div>

<p>
${percent.toFixed(1)}%
</p>

<div class="goal-grid">

<div>

<strong>
Fecha
</strong>

<br>

${goal.date}

</div>

<div>

<strong>
Faltan
</strong>

<br>

${money(
Math.max(
remaining,
0
)
)}

</div>

<div>

<strong>
Días
</strong>

<br>

${daysLeft}

</div>

<div>

<strong>
Diario
</strong>

<br>

${money(
Math.max(
perDay,
0
)
)}

</div>

<div>

<strong>
Semanal
</strong>

<br>

${money(
Math.max(
perWeek,
0
)
)}

</div>

<div>

<strong>
Mensual
</strong>

<br>

${money(
Math.max(
perMonth,
0
)
)}

</div>

</div>

<div class="goal-actions">

<button
onclick=
"openMoneyModal(${goal.id},'add')"
>

💰 Agregar

</button>

<button
onclick=
"openMoneyModal(${goal.id},'remove')"
>

➖ Retirar

</button>

<button
onclick=
"editGoal(${goal.id})"
>

✏ Editar

</button>

<button
onclick=
"deleteGoal(${goal.id})"
>

🗑 Eliminar

</button>

</div>

<div class="history">

<h4>
Historial
</h4>

${
historyHTML ||
"Sin movimientos"
}

</div>

</div>
`;

});

const allMovements =

goals.flatMap(
g => g.history
);

const now = new Date();

const weekAgo =
new Date();

weekAgo.setDate(
now.getDate()-7
);

const monthAgo =
new Date();

monthAgo.setMonth(
now.getMonth()-1
);

let weekly = 0;
let monthly = 0;

allMovements.forEach(move=>{

    const date =
    new Date(move.date);

    if(date >= weekAgo){

        weekly += move.amount;

    }

    if(date >= monthAgo){

        monthly += move.amount;

    }

});

weeklySaved.textContent =
money(weekly);

monthlySaved.textContent =
money(monthly);

if(goals.length){

    const sorted =

    [...goals]

    .sort(

        (a,b)=>

        (b.saved/b.target)

        -

        (a.saved/a.target)

    );

    bestGoal.textContent =
    sorted[0].name;

    worstGoal.textContent =
    sorted[
        sorted.length-1
    ].name;

}

}

function toggleTheme(){

document.body
.classList.toggle(
"dark"
);

localStorage.setItem(
"theme",
document.body
.classList
.contains("dark")
);

}

function loadTheme(){

if(
localStorage.getItem(
"theme"
)
===
"true"
){

document.body
.classList
.add(
"dark"
);

}

}

function renderAll(){

    calculateDashboard();

    renderGoals();

    renderCharts();

    renderCalendar();

    renderUpcomingGoals();

}

initNotifications();

checkUpcomingGoals();

loadTheme();

renderAll();

function renderUpcomingGoals(){

    const container =
    document.getElementById(
        "upcomingGoals"
    );

    if(!container)
    return;

    const upcoming =

    [...goals]

    .sort(

        (a,b)=>

        new Date(a.date)

        -

        new Date(b.date)

    )

    .slice(0,5);

    container.innerHTML = "";

    upcoming.forEach(goal=>{

        container.innerHTML +=

        `
        <div class="upcoming-item">

            <strong>
            ${goal.name}
            </strong>

            <br>

            ${goal.date}

        </div>
        `;

    });

}

function exportData(){

    const data = {

        goals,
        paydays,
        availableMoney

    };

    const blob =

    new Blob(

        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "metas-ahorro.json";

    a.click();

}

function importData(event){

    const file =
    event.target.files[0];

    if(!file)
    return;

    const reader =
    new FileReader();

    reader.onload =
e => {

    const data =
    JSON.parse(
        e.target.result
    );

    goals =
    data.goals || [];

    paydays =
    data.paydays || [];

    availableMoney =
    data.availableMoney || 0;

    saveGoals(goals);

    savePaydays(paydays);

    saveAvailableMoney(
        availableMoney
    );

    renderAll();

};

    reader.readAsText(file);

}

function removeMoney(id){

    const amount = Number(
        prompt(
            "Cantidad a retirar"
        )
    );

    if(
        !amount ||
        amount <= 0
    ) return;

    const goal =
    goals.find(
        g => g.id === id
    );

    if(
        amount >
        goal.saved
    ){

        alert(
            "No puedes retirar más de lo ahorrado."
        );

        return;

    }

    goal.saved -= amount;

    goal.history.unshift({

        amount:-amount,

        date:
        new Date()
        .toLocaleString()

    });

    saveGoals(goals);

    renderAll();

}