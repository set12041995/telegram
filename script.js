const obj = {
    x: 10,
    y: 20,
    inner: {
        x: 20,
        z: 30,
    },
    foo2: {
        k: 23,
        p: 13,
    }
}

const convert = (obj) => {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            const nestedObj = convert(obj[key]);
            for (const nestedKey in nestedObj) {
                result[nestedKey] = nestedObj[nestedKey];
            }
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

console.log(convert(obj));