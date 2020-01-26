import * as $ from 'jquery';

function createAnalytics() {
    let time = 0;

    return () => {
        time++;
        console.log(time);
        return time;
    };
}

const timeCounter = createAnalytics();

$(document).on('click', () => {
    timeCounter();
});
