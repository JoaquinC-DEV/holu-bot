import humanize from "humanize-duration";

export default function duration (time) {
    const timeString = humanize(time - Date.now(), {
        units: ['d', 'h', 'm', 's'],
        language: 'es',
        conjunction: ' y ',
        serialComma: false,
        round: true,
        largest: 1
    });

    return timeString;
}