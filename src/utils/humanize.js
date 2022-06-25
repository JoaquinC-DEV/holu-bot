import humanize from "humanize-duration";

export default function duration (time) {
    const timeString = humanize(time - Date.now(), {
        units: ['d', 'h', 'm'],
        language: 'es',
        conjunction: ' y ',
        serialComma: false,
    });

    return timeString;
}