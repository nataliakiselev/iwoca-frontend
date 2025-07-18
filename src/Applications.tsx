import { useState, useEffect } from "react";
import SingleApplication from "./SingleApplication";
import { Button } from "./ui/Button/Button";
import styles from "./Applications.module.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  const loadMoreApplications = async () => {
    const res = await fetch(`/api/applications?_page=1&_limit=5`);
    const data = await res.json();
    const linkHeader = res.headers.get('Link');
    setHasNextPage(linkHeader?.includes('rel="next"') ?? false);
    setApplications(prev => [...prev, ...data]);
    setNextPage(prev => prev + 1);
  };
  
  useEffect(() => {
    loadMoreApplications();
  }, []);
  

  return (
    <div className={styles.Applications}>
      {applications.map(application => (
      <SingleApplication  key={application.id} application={application} />
      ))}
      {hasNextPage && (
        <Button className={styles.button} onClick={loadMoreApplications}/> 
      )}
    </div>
  );
};

export default Applications;
