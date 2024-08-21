

const ExtractToken = (res: any): string | null => {
    if (res.headers) {
        const authHeader = res.headers['authorization'] || res.headers['Authorization'];
        if (authHeader) {
            return authHeader.replace('Bearer ', '').trim();
        }

        const customTokenHeader = res.headers['x-auth-token'] || res.headers['X-Auth-Token'];
        if (customTokenHeader) {
            return customTokenHeader.trim();
        }
    }

    if (res.data) {
        if (res.data.token) {
            return res.data.token;
        }

        if (res.data.data) {
            if (res.data.data.token) {
                return res.data.data.token;
            }

            for (const key in res.data.data) {
                if (res.data.data[key] && typeof res.data.data[key] === 'object') {
                    const nestedToken = extractTokenFromObject(res.data.data[key]);
                    if (nestedToken) {
                        return nestedToken;
                    }
                }
            }
        }
    }

    return "";
};

const extractTokenFromObject = (obj: any): string | null => {
    if (obj.token) {
        return obj.token;
    }

    for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            const nestedToken = extractTokenFromObject(obj[key]);
            if (nestedToken) {
                return nestedToken;
            }
        }
    }

    return null;
};


export default ExtractToken