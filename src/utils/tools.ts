// 函数防抖
const debounce = (fn: Function, delay: number = 600, immediate: boolean = false) => {
    let timeId: any = null;
    return function(that: any, ...args: any[]) {
        const callnow = immediate && !timeId;
        if (callnow) {
            fn.apply(that, args)
        }
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            fn.apply(that, args)
        }, delay);
    }
}

// 格式化数字 1300 => 1.3K
const formatNum = (num: number): number| string => {
    if(num > 10 ** 3) {
        return (num / 1000).toFixed(1) + 'k'
    }
    return num;
}

const openPage = (url: string, innerPage: boolean = false) => {
    if (innerPage) {
        window.open(`${process.env.PUBLIC_URL}${url}`)
    } else {
        window.open(url)
    }
}

export {
    debounce,
    formatNum,
    openPage,
}
