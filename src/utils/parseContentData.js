export default function (data) {
    Object.keys(data).map(key => {
        return {
            id: key,
            ...data[key],
        };
    });
}