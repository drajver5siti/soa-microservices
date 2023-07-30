import { useEffect, useState } from "react";

const defaultHeaders = {
    'Content-Type': 'application/json'
}

type ApiOptions = {
    body: any | undefined,
    method: string | undefined
};

const formatUrl = (url: string) => {
    return `http://localhost:3000${url}`;
}

const useApi = (url: string, options: ApiOptions) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            
            try {
                let res = await fetch(
                    formatUrl(url), 
                    {
                        signal: controller.signal,
                        headers: defaultHeaders,
                        method: options.method ?? 'GET',
                        body: options.body ? JSON.stringify(options.body) : null
                    }
                );

                res = await res.json();

                if(mounted) {
                    setData(res);
                }
            }
            catch(err) {
                if(mounted){
                    setError(err);
                }
            }
            finally{
                if(mounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();
        return () => {
            mounted = false;
            controller.abort();
        }
        
    }, []);

    return {
        data,
        error,
        loading
    }

}

export { useApi };