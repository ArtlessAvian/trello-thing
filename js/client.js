alert("Hello world!")

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

var t_test = null

var onRecalculateBtn = function(t) {
    t_test = t
}

TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return [{
            icon: {
                dark: WHITE_ICON,
                light: BLACK_ICON
            },
            text: 'Recalculate',
            callback: onRecalculateBtn,
            condition: 'edit'
        }];
    }
});