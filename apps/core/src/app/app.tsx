import { FunctionComponent, useEffect, useState } from 'react';
import { useWallet } from '@raidguild/quiver';

import { handleProposalArgs, sendProposal } from '../utils/proposal';
import { Button, FormBuilder } from '@daohaus-monorepo/daohaus-ui';
import { TRASH_PROPOSAL_FORMS } from '@daohaus/haus-sdk';
import { DAO_PROPOSALS, simpleFetch } from '../utils/theGraph';
import styled from 'styled-components';

type Proposal = {
  details: string;
};

const ProposalBox = styled.div`
  color: white;
  border-radius: 0.4rem;
  border: solid white;
  display: flex;
  flex-direction: column;
  width: 48rem;
  height: 20rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
  .proposalTitle {
    font-size: 3rem;
  }
  .proposalDescription {
    font-size: 2rem;
  }

  .proposalTitle,
  .proposalDesciption {
    margin: 1rem 0 1rem 0;
  }
`;

const ProposalList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const App: FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();
  const [proposals, setProposals] = useState<null | []>(null);

  useEffect(() => {
    let unsub = true;
    simpleFetch({
      setter: setProposals,
      unsub,
      query: DAO_PROPOSALS,
    });

    return () => {
      unsub = false;
    };
  }, []);
  const handleTest = () => {
    if (!provider) return;

    sendProposal(provider);
  };

  const formProposal = async (formValues: { [index: string]: unknown }) => {
    if (!provider) return;

    const proposalArgs = handleProposalArgs(formValues);
    try {
      sendProposal(provider, proposalArgs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet </Button>
      {address && <div>Connected: {address}</div>}
      <div>{/* {proposals?.map(prop => <div></div>) */}</div>
      <Button onClick={handleTest}>Dummy Proposal</Button>
      <FormBuilder
        onSubmit={formProposal}
        form={TRASH_PROPOSAL_FORMS.FREE_LOAD}
      />
      <ProposalList>
        {proposals?.map((proposal: Proposal) => {
          const details = JSON.parse(proposal.details);
          return (
            <ProposalBox>
              <p className="proposalTitle">{details.title}</p>
              <p className="proposalDescription">{details.description}</p>
            </ProposalBox>
          );
        })}
      </ProposalList>
      {/* <Switch>
        <Route exact path={`/baal/:chainID/:daoID`}>
          <Dao />
        </Route>
        <Route path="*">
          <div>Wrong Path</div>
        </Route>
      </Switch> */}
    </div>
  );
};

export default App;
