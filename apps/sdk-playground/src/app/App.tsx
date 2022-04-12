import React, { useState } from 'react';
import { useWallet } from '@raidguild/quiver';

import { Button } from '@daohaus/ui';
import { Haus } from '@daohaus/data';

const haus = Haus.create({
  '0x4': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
  '0x64': 'https://rpc.gnosischain.com',
});

const App: React.FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();
  const [dao, setDao] = useState(null);

  const getDao = async () => {
    const res = await haus.query.dao({
      networkId: '0x4',
      dao: '0x01bdc8eb83282f2ea61bf3387b24a8e760411655',
    });

    console.log('res', res);
    setDao(res.data.dao);
  };

  return (
    <>
      <div>
        <Button onClick={connectWallet}>Connect Wallet </Button>
        {address && <div>Connected: {address}</div>}
      </div>

      <hr />

      <div>
        <Button onClick={getDao}>dao query </Button>
        {dao && (
          <div>
            <div>dao: {dao.id}</div>
            <div>safeAddress: {dao.safeAddress}</div>
            <div>shareTokenName: {dao.shareTokenName}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
