const STORAGE_KEY = "metasAhorro";

function saveGoals(goals) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(goals)
    );
}

function loadGoals() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

function loadAvailableMoney(){

    return Number(

        localStorage.getItem(
            "availableMoney"
        )

    ) || 0;

}

function saveAvailableMoney(value){

    localStorage.setItem(

        "availableMoney",

        value

    );

}

function loadPaydays(){

    return JSON.parse(

        localStorage.getItem(
            "paydays"
        )

    ) || [];

}

function savePaydays(data){

    localStorage.setItem(

        "paydays",

        JSON.stringify(data)

    );

}
