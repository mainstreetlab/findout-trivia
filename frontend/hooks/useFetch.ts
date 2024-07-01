import { useState, useEffect } from 'react';

const useFetch = async (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       throw new Error(`Error fetching quiz data: ${response.statusText}`);
    //     }
    //     const data = await response.json();
    //     setData(data);
    //   } catch (err: any) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();

    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
