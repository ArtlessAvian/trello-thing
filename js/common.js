var pointsRegex = RegExp("(\\d+) [pP]oints?")

var getPoints = function(card) {
    let points = 0;

    // Get points from label
    for (let label of card.labels) {
        let labelMatches = pointsRegex.exec(label.name);
        if (labelMatches != null && labelMatches.length == 2) {
            points += Number.parseInt(labelMatches[1]);
            // break; // Count all labels or no?
        }
    }

    return points;
}

var getCompleted = function(card) {
    let points = 0;

    let cardMatches = pointsRegex.exec(card.desc);
    if (cardMatches != null && cardMatches.length == 2) {
        points -= Number.parseInt(cardMatches[1]);
    }

    return points;
}

var getStrategy = function(cards) {
    // Start with a bad strategy.
    // Work on the most urgent card until its due.
    cards.sort(function(a, b) {return Date.parse(a.due) - Date.parse(b.due);});

    let strategy = [];
    // array of "tuples" storing
    // the points (points)
    // the time (hours)
    // cards batched together (card objects)

    let start = Date.now();
    for (const card of cards) {
        let end = Date.parse(card.due);
        let hours = (end - start) / 1000 / 60 / 60;
        strategy.push([getPoints(card), hours, [card]]);
        start = end;
    }

    // Refine in O(n) time.
    let refined = [];
    let batching = [0, 0, []];
    for (const item of strategy) {
        if (item[0]/item[1] < batching[0]/batching[1]) {
            refined.push(batching);
            // please tell me there's a deepcopy function i don't know about.
            batching = item;
        } else {
            batching[0] += item[0];
            batching[1] += item[1];
            batching[2] = batching[2].concat(item[2]);
        }
    }
    refined.push(batching);
    return refined;
}