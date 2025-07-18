import { useState, useEffect } from "react";
import SingleApplication from "./SingleApplication";
import { Button } from "./ui/Button/Button";
import styles from "./Applications.module.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  const fetchApplications = async () => {
    try{
    const res = await fetch(`/api/applications?_page=1&_limit=5`);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const linkHeader = res.headers.get('Link');

    setHasNextPage(linkHeader?.includes('rel="next"') ?? false);
    setApplications(prev => [...prev, ...data]);
    setNextPage(prev => prev + 1);
    } catch (error){
      console.error('Error fetching applications:', error);
      // surface error to the UI
    }
  };
  
  useEffect(() => {
    fetchApplications();
  }, []);
  

  return (
    <div className={styles.Container}>
    <div className={styles.Applications}>
      {applications.map(application => (
      <SingleApplication  key={application.id} application={application} />
      ))}
      </div>
      {hasNextPage && (
        <Button variant="load" text='Load more' onClick={fetchApplications}/> 
      )}
    </div>
  );
};

export default Applications;
