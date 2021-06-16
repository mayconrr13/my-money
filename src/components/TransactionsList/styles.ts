import styled from 'styled-components';

interface ContainerProps {
  visibleSection: 'statistics' | 'transactions';
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 600px;
  max-height: 425px;

  overflow-y: scroll;
  padding: 0 1.5rem;

  display: ${({ visibleSection }) =>
    visibleSection === 'transactions' ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;

  > div + div {
    margin-top: 1rem;
  }

  @media (min-width: 800px) {
    display: flex;
  }
`;
