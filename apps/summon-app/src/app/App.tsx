import { DaoHausNav } from '@daohaus/daohaus-connect-feature';
import { Button, H1, HausThemeContext } from '@daohaus/ui';
import { useContext } from 'react';
import styled from 'styled-components';

const TemporaryLayout = styled.main`
  width: 100%;
`;

export function App() {
  const { toggleLightDark } = useContext(HausThemeContext);

  return (
    <TemporaryLayout>
      <DaoHausNav />
      <H1>test</H1>
      <Button onClick={toggleLightDark}>Toggle Theme</Button>
    </TemporaryLayout>
  );
}

export default App;
