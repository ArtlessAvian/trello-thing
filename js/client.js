// alert("Hello world!")

var pointsRegex = RegExp("(\\d+) Points?")

var targetVelocity = -1
// var calcVeclocity = function(lists) {
    // targetVelocity = 0
    // for (let listIndex in lists) {
    //     let list = lists[listIndex];
        
    //     for (let cardIndex in list.cards) {
    //         let card = list.cards[cardIndex];
    //         if (card.dueComplete) {continue;}

    //         let points = 0;

    //         // Get points from label
    //         for (let labelIndex in card.labels) {
    //             let label = card.labels[labelIndex];

    //             let labelMatches = pointsRegex.exec(label.name);
    //             if (labelMatches != null && labelMatches.length == 2) {
    //                 points += Number.parseInt(labelMatches[1]);
    //                 break;
    //             }
    //             console.log("im still gay")
    //         }

    //         // Subtract completed points
    //         let cardMatches = pointsRegex.exec(card.desc);
    //         if (cardMatches != null && cardMatches.length == 2) {
    //             points -= Number.parseInt(cardMatches[1]);
    //         }

    //         // Add to velocity
    //         if (points != 0) {
    //             let dueDate = new Date(Date.parse(card.due)-1); // -1 for midnight due dates
    //             let nowDate = new Date(Date.now()-1); // -1 for relative
                
    //             // dueDate.setMilliseconds(0); dueDate.setSeconds(0); dueDate.setMinutes(0); dueDate.setHours(0);
    //             // nowDate.setMilliseconds(0); nowDate.setSeconds(0); nowDate.setMinutes(0); nowDate.setHours(0);
                
    //             let days = (dueDate - nowDate) / 86400000;
    //             console.log(points, days, card.name);
    //             // console.log(points/days, card.name);
    //             targetVelocity += points/days;
    //         }
    //     }
    // }
// }

TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return [{
            text: 'Recalculate',
            callback: onRecalculateBtn,
            condition: 'edit'
        }];
    }
});