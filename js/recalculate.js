var pointsRegex = RegExp("(\\d+) [pP]oints?")

var getPoints = function(card) {
    let points = 0;

    // Get points from label
    for (let labelIndex in card.labels) {
        let label = card.labels[labelIndex];

        let labelMatches = pointsRegex.exec(label.name);
        if (labelMatches != null && labelMatches.length == 2) {
            points += Number.parseInt(labelMatches[1]);
            // break; // Count all labels or no?
        }
    }

    // Subtract completed points
    let cardMatches = pointsRegex.exec(card.desc);
    if (cardMatches != null && cardMatches.length == 2) {
        points -= Number.parseInt(cardMatches[1]);
    }

    return points;
}

// var dateOffset = 0;
// // var dateOffset = new Date().getTimezoneOffset() * 60 * 1000 // Timezone offset + 2 Hours for 10-midnight due dates
// // dateOffset += (60 * 2) * 60 * 1000;
// var dateTransform = function(milliseconds) {
//     let out = new Date(milliseconds + dateOffset);
//     // out.setMilliseconds(0); out.setSeconds(0); out.setMinutes(0); out.setHours(0);
//     return out;
// }

var getPointsByDate = function(lists) {
    let pointsByDate = [];
    let debugThing = [];
    let nowDate = new Date(Date.now());

    for (let listIndex in lists) {
        let list = lists[listIndex];
        for (let cardIndex in list.cards) {
            let card = list.cards[cardIndex];
            if (card.dueComplete) {continue;}   

            let points = getPoints(card)
            if (points != 0) {
                let dueDate = new Date(Date.parse(card.due));
                let days = Math.ceil((dueDate - nowDate) / 86400000);
                while(pointsByDate.length <= days) {pointsByDate.push(0);} // Trailing 0 is intentional
                while(debugThing.length <= days) {debugThing.push("");} // Trailing 0 is intentional
                pointsByDate[days-1] += points;
                debugThing[days-1] += debugThing[days-1] ? ", " : "";
                debugThing[days-1] += card.name + " (" + points + ")";
            }
        }
    }
    console.log(debugThing);
    return pointsByDate;
}

var isNonIncreasing = function(list) {
    return !list.some(function(element, index) {return index != 0 && element > list[index-1]});
}

var refineVelocity = function(pointsByDate) {
    let previous = 0;
    let count = 0;
    let sum = 0;
    let out = [];
    for (let index in pointsByDate) {
        if (pointsByDate[index] < previous) {
            for (let i = 0; i < count; i++) {out.push(sum/count);}
            sum = 0;
            count = 0;
        }
        previous = pointsByDate[index];
        count++;
        sum += previous;
    }
    out.push(0); // Trailing 0 again

    if (isNonIncreasing(pointsByDate))
    {
        return out;
    }
    return refineVelocity(out);
}

// O(n^2) for correctness. O(n) for good enough
var onTodayBtn = function(t) {
    let urgency; // wow what a weird statement
    let urgency_amt;

    t.lists('cards')

    .then(getPointsByDate)

    .then(function(pointsByDate) {
        console.log(pointsByDate)
        urgency = pointsByDate.findIndex(a => a);
        urgency_amt = pointsByDate.find(a => a);
        return refineVelocity(pointsByDate);
    })
    
    .then(function(pointsByDate) {
        // Probably good enough
        // console.log(pointsByDate.slice(0, 7))
        console.log(pointsByDate);
        let nonurgent_points = pointsByDate.slice(0, urgency + 1).reduce((a, b) => a + b) - urgency_amt;
        nonurgent_points = Math.min(nonurgent_points, pointsByDate[0]);
        console.log(nonurgent_points);
        
        let out_string = "You should complete " + Math.round(pointsByDate[0] * 10)/10 + " points within the next 24 hours!";
        out_string += "\n";
        out_string += "Of those points, " + Math.round((pointsByDate[0] - nonurgent_points) * 10)/10 + " of them must be spent on the most urgent task(s).";
        out_string += "\n";
        out_string += "The remaining " + Math.round(nonurgent_points * 10)/10 + " points may be spent on any task.";
        window.alert(out_string);
    });
}