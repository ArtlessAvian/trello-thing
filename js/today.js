var today = {}

today.filterCards = function(cards) {
    return cards.filter(card => !card.dueComplete);
}

today.sumHours = function(strategy, index = 0, hours = 24) {
    if (hours <= strategy[index][1])
    {
        return strategy[index][0] * hours / strategy[index][1];
    }
    return strategy[index][0] + today.sumHours(strategy, index+1, hours - strategy[index][1]);
}

today.getCardsToFinish = function(strategy, hours = 24) {
    let outstring = "";

    for (const batch of strategy)
    {
        for (const card of batch[2])
        {
            if (Date.parse(card.due) < Date.now() + hours * 60 * 60 * 1000)
            {
                if (outstring != "") {outstring += " ";}
                outstring += card.name;
            }
        }
     
        hours -= batch[0];
        if (hours <= 0) {break;}
    }

    return outstring;
}

var onTodayButton = function(t) {
    t.cards('all')
        .then(filterValidCards)
        .then(today.filterCards)
        .then(getStrategy)
        .then(subCompleted)
        // .then(function(strategy) {console.log(strategy); return strategy;})
        // .then(printStrategy2D)
        .then(refineStrategy)
        .then(printStrategyNames)
        // .then(printStrategy2D)
        .then(function(strategy) {

            console.log(strategy);
            console.log(`In the next 24 hours, you should do ${Math.ceil(today.sumHours(strategy)*100)/100} points.`);

            console.log(`You must finish: ${today.getCardsToFinish(strategy)}`);
            console.log(`You can work on: ${strategy[0][2].map(card => card.name).join()}`);

        });
}

// var sumStrategy = function(strategy, hours) {
//     let points = 0;
//     for (const batch of strategy) {
//         points += batch[0] * Math.min(1, hours/batch[1]);
//         hours -= batch[1];
//         if (hours <= 0) {
//             break;
//         }
//     }
//     return points;
// }

// var examineStrategy = function(strategy, hours) {
//     // console.log(strategy);
//     printPriorities(strategy);

//     const target_points = sumStrategy(strategy, hours);
//     console.log(`In the next ${hours} hours, you should do ${Math.ceil(target_points*100)/100} points.`);

//     let current_card = null;
//     let remaining_points = target_points;
//     let remaining_hours = hours;
//     let finished_string = "";
//     for (const batch of strategy) {
//         for (const card of batch[2]) {
//             if (Date.parse(card.due) - Date.now() > hours * 60 * 60 * 1000) {
//                 current_card = card;
//                 break;
//             }
//             finished_string += card.name + " ";
//             remaining_points -= getPoints(card);
//             remaining_hours = hours - (Date.parse(card.due) - Date.now()) / 1000 / 60 / 60;
//         }
//         if (current_card != null) {
//             break;
//         }
//     }
//     if (finished_string != "") {console.log(`You must finish: ${finished_string}`);}
//     if (current_card != null) {
//         const current_points = getPoints(current_card);
//         const time_left = (Date.parse(current_card.due) - Date.now()) / 1000 / 60 / 60 - hours;
//         const forced_points = current_points - time_left * remaining_points/remaining_hours;
//         if (forced_points > 0) {
//             console.log(`You must spend ${Math.ceil(forced_points*100)/100} of those points on ${current_card.name}`);
//         }
//     }
// }

// var printPriorities = function(strategy) {
//     console.log(strategy.map(grouping => grouping[2].map(card => card.name)));
// }