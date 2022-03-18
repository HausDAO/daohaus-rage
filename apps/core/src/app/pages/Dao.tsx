import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type RouterParams = {
  daoID?: string;
  chainID?: string;
};

const fetchDAO = () => {
  
}

const Dao = () => {
  const { daoID, chainID }: RouterParams = useParams();
  const [dao, setDao] = useState();

  useEffect(() => {
    let shouldUpdate = true;
    if (!daoID || !chainID) return;
    const getDAO = async () => {
      
    }
    
    
    return () => {
      shouldUpdate = false;
    };
  }, [daoID, chainID]);
  return <div>Dao</div>;
};

export default Dao;
