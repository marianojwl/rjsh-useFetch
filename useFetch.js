import React from 'react'

function useFetch(endpoint){
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = async (method="GET", query="", payload=null) => {
    setLoading(true);
    try {
      const res = await fetch(endpoint+query, method==="GET" ? null : {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed');
      }

      const responseJson = await res.json();
      setResponse(responseJson);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const get = async query => request("GET", query, null);
  const post = async payload => request("POST", "", payload);
  const put = async payload => request("PUT", "", payload);
  
  return {response, error, loading, get, post, put};
}
