import * as $ from 'jquery';

function createAnalytics(): () => number {
    let time = 0;

    return (): number => {
        time++;
        console.log(time);
        return time;
    };
}

const timeCounter: () => number = createAnalytics();

$(document).on('click', (): void => {
    timeCounter();
});
