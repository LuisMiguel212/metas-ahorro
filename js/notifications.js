async function initNotifications(){

    if(!("Notification" in window))
    return;

    if(Notification.permission === "default"){

        await Notification.requestPermission();

    }

}

function checkUpcomingGoals(){

    if(Notification.permission !== "granted")
    return;

    const now = new Date();

    goals.forEach(goal=>{

        const targetDate =
        new Date(goal.date);

        const diffDays =
        Math.ceil(
            (
                targetDate - now
            ) / 86400000
        );

        if(
            diffDays > 0 &&
            diffDays <= 7
        ){

            new Notification(

                "Meta próxima",

                {

                    body:
                    `${goal.name} vence en ${diffDays} días.`

                }

            );

        }

    });

}
