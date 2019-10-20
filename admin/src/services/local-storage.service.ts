export const LocalStorageService = {
    getStorage,
    createStorage,
    updateStorage,
    updateToken
};

interface ILocalStorageData {
    username: string;
    token: string;
    refreshToken: string;
    rights: string[];
}

function getStorage(): ILocalStorageData {
    const tmpData = localStorage.getItem('store');
    let data: ILocalStorageData;
    if (tmpData === null) {
        data = createStorage();
    } else {
        data = JSON.parse(tmpData);
    }
    return data;
}

function createStorage(): ILocalStorageData {
    const data: ILocalStorageData = {
        username: '',
        refreshToken: '',
        rights: [],
        token: ''
    };
    localStorage.setItem('store', JSON.stringify(data));
    return data;
}

function updateStorage(data: ILocalStorageData): void {
    localStorage.setItem('store', JSON.stringify(data));
}

function updateToken(token: string): void {
    const data = getStorage();
    data.token = token;
    updateStorage(data);
}