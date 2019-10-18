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

    console.assert(points >= 0, `${card.name} has negative points. >:(`);
    return points;
}

var filterCards = function(cards) {
    return cards.filter(card => !card.dueComplete);
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

var sumStrategy = function(strategy, hours) {
    let points = 0;
    for (const batch of strategy) {
        points += batch[0] * Math.min(1, hours/batch[1]);
        hours -= batch[1];
        if (hours <= 0) {
            break;
        }
    }
    return points;
}

var examineStrategy = function(strategy, hours) {
    // console.log(strategy);
    printPriorities(strategy);

    const target_points = sumStrategy(strategy, hours);
    console.log(`In the next ${hours} hours, you should do ${Math.ceil(target_points*100)/100} points.`);

    let current_card = null;
    let remaining_points = target_points;
    let remaining_hours = hours;
    let finished_string = "";
    for (const batch of strategy) {
        for (const card of batch[2]) {
            if (Date.parse(card.due) - Date.now() > hours * 60 * 60 * 1000) {
                current_card = card;
                break;
            }
            finished_string += card.name + " ";
            remaining_points -= getPoints(card);
            remaining_hours = hours - (Date.parse(card.due) - Date.now()) / 1000 / 60 / 60;
        }
        if (current_card != null) {
            break;
        }
    }
    if (finished_string != "") {console.log(`You must finish: ${finished_string}`);}
    if (current_card != null) {
        const current_points = getPoints(current_card);
        const time_left = (Date.parse(current_card.due) - Date.now()) / 1000 / 60 / 60 - hours;
        const forced_points = current_points - time_left * remaining_points/remaining_hours;
        if (forced_points > 0) {
            console.log(`You must spend ${Math.ceil(forced_points*100)/100} of those points on ${current_card.name}`);
        }
    }
}

var printPriorities = function(strategy) {
    console.log(strategy.map(grouping => grouping[2].map(card => card.name)));
}

var onTodayBtn = function(t) {
    t.cards('all')
        .then(filterCards)
        .then(getStrategy)
        .then(function(strategy) {
            const hours = 24;
            examineStrategy(strategy, hours);
        });
}