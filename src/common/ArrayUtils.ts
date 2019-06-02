export const last = <T>(arr: T[]): T => arr.length > 1 ? arr[arr.length - 1] : arr[0];

interface IOnlyExcept {
    <T>(arr: T[], by: T[]): T[];
    <T, K extends keyof T>(arr: T[], by: T[K][], on: K): T[];
}

export const except: IOnlyExcept = <T, K extends keyof T>(arr: T[], by: T[K][] | T[], on?: K) => {
    if (on) {
        (<T[K][]>by).forEach(byEl => {
            arr = arr.filter(o => o[on] !== byEl);
        });

        return arr;
    }

    (<T[]>by).forEach(byEl => {
        arr = arr.filter(el => el !== byEl);
    });

    return arr;
};

export const only: IOnlyExcept = <T, K extends keyof T>(arr: T[], by: T[K][] | T[], on?: K) => {
    if (on) {
        (<T[K][]>by).forEach(byEl => {
            arr = arr.filter(o => o[on] === byEl);
        });

        return arr;
    }

    (<T[]>by).forEach(byEl => {
        arr = arr.filter(el => el === byEl);
    });

    return arr;
};
