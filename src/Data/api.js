export const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };