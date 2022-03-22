import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useWallet } from '@raidguild/quiver';

import { handleProposalArgs, sendProposal, TEST } from '../utils/proposal';
import { Button, FormBuilder } from '@daohaus-monorepo/daohaus-ui';
import { TRASH_PROPOSAL_FORMS } from '@daohaus/haus-sdk';
import { DAO_PROPOSALS, simpleFetch } from '../utils/theGraph';
import styled from 'styled-components';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import { providers } from 'ethers';

type Proposal = {
  details: string;
  id: string;
};

const Layout = styled.main`
  color: white;
  font-size: 1.6rem;
  nav {
    margin: 1rem 0;
    a {
      margin: 1rem 2rem;
    }
  }
  a {
    color: white;
  }
`;

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

const ProposalListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const daoID = TEST.DAO;
const chainID = '0x4';
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

  return (
    <Layout>
      <Button onClick={connectWallet}>Connect Wallet </Button>
      {address && <div>Connected: {address}</div>}
      <Button onClick={handleTest}>Dummy Proposal</Button>
      <nav>
        <Link to={`/list`}>List</Link>
        <Link to={`/form`}>Form</Link>
      </nav>
      <Switch>
        <Route exact path="/list">
          <ProposalList proposals={proposals} />
        </Route>
        <Route exact path={`/form`}>
          <Form provider={provider} />
        </Route>
        <Route exact path={`/baal/${chainID}/${daoID}/:proposalID`}>
          <ProposalDetails proposals={proposals} />
        </Route>
      </Switch>
    </Layout>
  );
};

const Form: FunctionComponent<{
  provider: providers.Web3Provider | null | undefined;
}> = ({ provider }) => {
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
    <FormBuilder
      onSubmit={formProposal}
      form={TRASH_PROPOSAL_FORMS.FREE_LOAD}
    />
  );
};

const ProposalList: FunctionComponent<{ proposals: Proposal[] | null }> = ({
  proposals,
}) => (
  <ProposalListContainer>
    {proposals?.map((proposal: Proposal) => {
      const details = JSON.parse(proposal.details);
      return (
        <ProposalBox key={proposal.id}>
          <p className="proposalTitle">{details.title}</p>
          <p className="proposalDescription">{details.description}</p>
          <Link to={`/baal/${chainID}/${daoID}/${proposal.id}`}>Details</Link>
        </ProposalBox>
      );
    })}
  </ProposalListContainer>
);

const ProposalDetails: FunctionComponent<{
  proposals: Proposal[] | null;
}> = ({ proposals }) => {
  const { proposalID }: { proposalID: string | undefined } = useParams();
  const selectedProposal = useMemo(() => {
    if (!proposals || !proposalID) return;
    const propRaw = proposals?.find((proposal) => proposal.id === proposalID);
    return propRaw && { ...propRaw, details: JSON.parse(propRaw.details) };
  }, [proposals, proposalID]);

  return (
    <ProposalBox>
      {selectedProposal && (
        <>
          <p className="proposalTitle">{selectedProposal.details.title}</p>
          <p className="proposalDescription">
            {selectedProposal.details.description}
          </p>
        </>
      )}
      <Link to="/list">Back to Proposals</Link>
    </ProposalBox>
  );
};

export default App;
