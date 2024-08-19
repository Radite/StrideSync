import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useTrainingData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
      setHistoricalData(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data initially when the hook is used
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return refetch function along with data, loading, and error
  return { historicalData, loading, error, refetch: fetchData };
};

export default useTrainingData;
