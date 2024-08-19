import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useTrainingData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.100.71:3000/api/training-sessions/athlete/1');
      setHistoricalData(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { historicalData, loading, error };
};

export default useTrainingData;
