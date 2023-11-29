import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 */
export default function useGet(url, initialState = null) {

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [resetBit, setResetBit] = useState(false);

    const reset = () => setResetBit(!resetBit);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    }, [url, resetBit]);

    return { data, isLoading, error, reset };
}