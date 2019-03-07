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

var dateOffset = (new Date().getTimezoneOffset() + 60 * 2) * 60 * 10000 // Timezone offset + 2 Hours for 10-midnight due dates
var dateTransform = function(milliseconds) {
    let out = new Date(milliseconds + dateOffset);
    out.setMilliseconds(0); out.setSeconds(0); out.setMinutes(0); out.setHours(0);
    return out;
}

var getPointsByDate = function(lists) {
    let pointsByDate = []
    let nowDate = dateTransform(Date.now()); // +1 hour

    for (let listIndex in lists) {
        let list = lists[listIndex];
        for (let cardIndex in list.cards) {
            let card = list.cards[cardIndex];
            if (card.dueComplete) {continue;}   

            let points = getPoints(card)
            if (points != 0) {
                let dueDate = dateTransform(Date.parse(card.due));
                let days = Math.ceil((dueDate - nowDate) / 86400000);
                console.log(points, days, card.name);
                while(pointsByDate.length <= days) {pointsByDate.push(0);} // Trailing 0 is intentional
                pointsByDate[days-1] += points;
            }
        }
    }
    return pointsByDate;
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
    return out;
}

// O(n^2) for correctness. O(n) for good enough
var onRecalculateBtn = function(t) {
    t.lists('cards')

    .then(getPointsByDate)
    
    .then(function(pointsByDate) {
        console.log(pointsByDate)
        return refineVelocity(pointsByDate);
    })
    
    .then(function(pointsByDate) {
        console.log(pointsByDate)
        return refineVelocity(pointsByDate);
    })
    
    .then(function(pointsByDate) {
        console.log(pointsByDate)
        return refineVelocity(pointsByDate);
    })
    
    .then(function(pointsByDate) {
        // Probably good enough
        console.log(pointsByDate.slice(0, 7))
    });
}