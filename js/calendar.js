let calendar = null;

function renderCalendar() {

    const calendarEl =
    document.getElementById(
        "calendar"
    );

    if (!calendarEl) return;

    if (calendar) {
        calendar.destroy();
    }

const goalEvents =
goals.map(goal => {

    const percent =

    goal.saved /
    goal.target *
    100;

    let color =
    "#c0392b";

    if(percent >= 100){

        color =
        "#27ae60";

    }

    else if(percent >= 75){

        color =
        "#f39c12";

    }

    return {

    id:
    goal.id,

    title:
    goal.name,

    start:
    goal.date,

    color

};
});

const paydayEvents =
paydays.map(
payday => ({

    id:
    payday.id,

    title:
    "💰 " +
    payday.title,

    start:
    payday.date,

    color:
    "#f1c40f",

    textColor:
    "#000000"

})
);

const events =

[
    ...goalEvents,
    ...paydayEvents
];

calendar =
new FullCalendar.Calendar(
    calendarEl,
    {
            initialView:
            "dayGridMonth",

            locale:
            "es",

            height:
            "auto",

            events, 

            eventClick(info){

    const title =
    info.event.title;

    // Evento de día de pago

    if(title.startsWith("💰")){

        const payday =
        paydays.find(

            p =>

            "💰 " +
            p.title ===
            title

        );

        if(!payday)
        return;

        alert(
`
💰 DÍA DE PAGO

Nombre:
${payday.title}

Fecha:
${payday.date}
`
        );

        return;

    }

    // Evento de meta

const goal =
goals.find(
    g =>
    g.id ==
    info.event.id
);

    if(!goal)
    return;

    const percent =

    goal.saved /
    goal.target *
    100;

    alert(
`
🎯 META

Nombre:
${goal.name}

Objetivo:
${money(goal.target)}

Ahorrado:
${money(goal.saved)}

Progreso:
${percent.toFixed(1)}%

Fecha:
${goal.date}
`
    );

            }
    }
);

calendar.render();
}
 
