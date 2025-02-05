const _result = document.getElementById("result");
const _resultList = document.getElementById("resultList");
const _resultList2 = document.getElementById("resultList2");
const _resultList3 = document.getElementById("resultList3");
const _resultList4 = document.getElementById("resultList4");

const _resultList5 = document.getElementById("resultList5");

let _possibleStars = 0; 

let _test;

function AddTownHallLevels(){
    // Get the values of your clans town hall levels and store them in an list
    const townHallLevels = [];
    let stars = 0;
    let o = 1;
    for (let i = 0; i < 15; i++) {
        
        const element = document.getElementById("th" + o);
        if (element) {
            townHallLevels[i] = element.value;
        } else {
            townHallLevels[i] = null; // or any default value you prefer
        }
        o++;
    }

    // Get the values of the enemy clans town hall levels and store them in an list
    const enemyTownHallLevels = [];
    for (let i = 0; i < 15; i++) {
        const element = document.getElementById("th" + o);
        if (element) {
            enemyTownHallLevels[i] = element.value;
        } else {
            enemyTownHallLevels[i] = null; // or any default value you prefer
        }
        o++;
    }
    _result.textContent = "Stars: " + CalculateStars(townHallLevels, enemyTownHallLevels) + "-" + _test;
}

function CalculateStars(myList, otherList){
    let stars = 0;

    // tree star attacks
    for (let i = 0; i < myList.length; i++){
        for (let j = 0; j < otherList.length; j++){
            if (myList[i] === otherList[j]){
                const message = `3 Star attack attacker: our th${myList[i]} defender: their th${otherList[j]}`;
                console.log(message);

                // Create a new list item and append it to the result list
                const listItem = document.createElement("li");
                listItem.textContent = message;
                _resultList.appendChild(listItem);
                
                myList.splice(i, 1);
                otherList.splice(j, 1);
                stars += 3;
                i--; // Adjust index after splice
                break; // Exit inner loop to avoid skipping elements
            }
        }
    }
    console.log("Remaining attackers and defenders after 3 star attacks");
    // two star attacks
    for (let i = 0; i < myList.length; i++) {
        for (let j = 0; j < otherList.length; j++) {
            let temp = otherList[j] - 1;
            if (myList[i] == temp) {
                const message = `2 Star attack attacker: our th${myList[i]} defender: their th${otherList[j]}`;
                console.log(message);
                
                // Create a new list item and append it to the result list
                const listItem = document.createElement("li");
                listItem.textContent = message;
                _resultList2.appendChild(listItem);
                
                myList.splice(i, 1);
                otherList.splice(j, 1);
                stars += 2;
                i--; // Adjust index after splice
                break; // Exit inner loop to avoid skipping elements
            }
        }
    }
    // one star attacks
    for (let i = 0; i < myList.length; i++) {
        for (let j = 0; j < otherList.length; j++) {
            let temp = otherList[j] - 2;
            if (myList[i] == temp) {
                const message = `1 Star attack attacker: our th${myList[i]} defender: their th${otherList[j]}`;
                console.log(message);
                
                // Create a new list item and append it to the result list
                const listItem = document.createElement("li");
                listItem.textContent = message;
                _resultList3.appendChild(listItem);
                
                myList.splice(i, 1);
                otherList.splice(j, 1);
                stars += 1;
                i--; // Adjust index after splice
                break; // Exit inner loop to avoid skipping elements
            }
        }
    }
    // remaining attacks
    console.log("Remaining attackers and defenders after 1 and 2 star attacks");
    myList.sort((a, b) => a - b);
    otherList.sort((a, b) => a - b);

    for (let i = 0; i < myList.length; i++) {
        for (let j = 0; j < otherList.length; j++) {
            if (Number(myList[i]) > Number(otherList[j])) {
                const message = `3 Star attack attacker: our th${myList[i]} defender: their th${otherList[j]}`;
                console.log(message);
                
                // Create a new list item and append it to the result list
                const listItem = document.createElement("li");
                listItem.textContent = message;
                _resultList4.appendChild(listItem);
                
                myList.splice(i, 1);
                otherList.splice(j, 1);
                stars += 3;
                i--; // Adjust index after splice
                break; // Exit inner loop to avoid skipping elements
            }
        }
    }
    
    // possible 1 star attacks
    for(let i = 0; i < myList.length; i++){
        if(Number(myList[i]) > 7){
            const message = `Possible 1 star attack attacker: our th${myList[i]} defender: their th${otherList[i]}`;
            console.log(message);

            // Create a new list item and append it to the result list
            const listItem = document.createElement("li");
            listItem.textContent = message;
            _resultList5.appendChild(listItem);

            myList.splice(i, 1);
            otherList.splice(i, 1);
            _possibleStars += 1;
            i--; // Adjust index after splice
        }
    }
    console.log(myList);
    console.log(stars);
    _test = stars + _possibleStars;
    console.log(_possibleStars);

    return stars;
}