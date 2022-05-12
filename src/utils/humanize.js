import humanize from "humanize-duration";

export default function duration (time) {
    const timeString = humanize(time - Date.now(), {
        units: ['h','m','s'],
        language: 'es',
        conjunction: ' y ',
        serialComma: false,
        round: true
    });

    return timeString;
}