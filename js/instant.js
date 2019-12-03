
var onInstantButton = function(t) {
    t.cards('all')
        .then(function(cards) {
            // process raw stuff
            let filtered = cards; // 
            let strategy = getStrategy(filtered);
            // process stuff
            // examineStrategy(strategy, recent, 24);
            // process refined stuff
        });
}

// var filterPast = function(cards) {
//     return cards.filter(card => Date.now() < Date.parse(card.due));
// }

// var getRecent = function(cards) {
//     let mostRecent = 0;
//     let mostRecentCard = null;
//     for (let card of cards) {
//         let parsed = Date.parse(card.due);
//         if (parsed < Date.now()) {
//             if (parsed > mostRecent) {
//                 mostRecent = parsed;
//                 mostRecentCard = card;
//             }
//         }
//     }
//     return mostRecentCard;
// }

// var currentPoints = function(strategy, recent) {
//     // return Date.now()-Date.parse(recent.due);
//     return strategy[0][0] * (Date.now()-Date.parse(recent.due)) / 1000 / 60 / 60 / strategy[0][1];
// }

// var getVelocity = function(strategy) {
//     return strategy[0][0] / strategy[0][1];
// }

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

// var examineStrategy = function(strategy, recent, hours) {
//     console.log(strategy);
//     printPriorities(strategy);

//     const current_points = currentPoints(strategy, recent);
//     console.log(`You should currently have ${Math.ceil(current_points*100)/100} points among pending tasks.`);
//     const current_velocity = getVelocity(strategy);
//     console.log(`Your average velocity should be ${Math.ceil(current_velocity*100)/100} points per hour.`);
//     const target_points = sumStrategy(strategy, hours);
//     console.log(`To get back on pace, you should do ${Math.ceil(target_points*100)/100} points in the next ${hours} hours.`);

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