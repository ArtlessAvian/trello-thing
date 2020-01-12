var filterValidCards = cards => cards.filter(card => card.due != null);

var pointsRegex = RegExp("(\\d+) [pP]oints?");

var getPoints = function(card) {
    let points = 0;

    // Get points from label
    for (const label of card.labels) {
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
        points += Number.parseInt(cardMatches[1]);
    }

    return points;
}

var getPastDue = card => Date.now() < Date.parse(card.due);

var filterPastDue = cards => cards.filter(getPastDue);

var getStrategy = function(cards) {
    // Start with a bad strategy.
    // Work on the most urgent card until its due.
    cards.sort((a, b) => Date.parse(a.due) - Date.parse(b.due));

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

    return strategy;
}

var subCompleted = function(strategy) {
    for (let batch of strategy)
    {
        for (let card of batch[2])
        {
            batch[0] -= getCompleted(card);
        }
    }

    return strategy;
}

var refineStrategy = function(strategy)
{
    let refined = [];
    // let batching = [0, 0, []];
    for (let item of strategy)
    {
        while (true)
        {
            let lastBatch = refined[refined.length-1];
            if (refined.length == 0 || (item[0]/item[1] < lastBatch[0]/lastBatch[1]))
            {
                refined.push(item);
                break;
            }
            else
            {
                lastBatch[0] += item[0];
                lastBatch[1] += item[1];
                lastBatch[2] = lastBatch[2].concat(item[2]);
                item = refined.pop();
            }
        }
    }
    return refined;
}

var printStrategyNames = function(strategy) {
    console.log(strategy.map(grouping => grouping[2].map(card => card.name)));
    return strategy;
}

var printStrategy2D = function(strategy) {
    let sumTime = 0;
    let sumPoints = 0;
    let out = "";
    for (const step of strategy) {
        sumTime += step[1];
        sumPoints += step[0];
        out += `(${sumTime}, ${sumPoints})\n`;
    }
    console.log(out);
    return strategy;
}