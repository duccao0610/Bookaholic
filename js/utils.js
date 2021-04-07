//md5
export default function md5(value) {
    return CryptoJS.MD5(value).toString();
}
//validate email format
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// validate field rong 
export function required(value) {
    return value != "";
}

//get data
export function getDataFromDoc(doc) {
    return {
        id: doc.id,
        ...doc.data()
    };
};

export function getDataFromDocs(docs) {
    return docs.map((doc) => {
        return getDataFromDoc(doc);
    })
}

export function toTop() {
    document.scrollTop = "0px";
}

export function getRandomIndexes(arr) {
    let randoms = [];
    if (arr.length < 4) {
        return arr;
    } else {
        let random;
        do {
            random = Math.floor(Math.random() * arr.length);
            if (randoms.includes(random) == false) {
                randoms.push(random);
            }
        } while (randoms.length < 4);
    }
    return randoms;
}

export function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}