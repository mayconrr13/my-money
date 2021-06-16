import styled from 'styled-components';

interface TransactionProps {
  type: string;
}

export const Container = styled.div<TransactionProps>`
  display: flex;
  align-items: center;

  width: 100%;

  > span {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;

    padding: 0.3rem;
    margin-right: 1rem;
    background-color: var(--gray);

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    strong {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text);
    }

    span {
      font-size: 0.625rem;
      font-weight: 40;
      color: var(--details);
    }
  }

  > strong {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ type }) => (type === 'income' ? 'var(--green)' : 'var(--red)')};

    margin-left: auto;
  }

  @media (min-width: 800px) {
    > span {
      width: 3rem;
      height: 3rem;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    div {
      strong {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }

      span {
        font-size: 0.75rem;
      }
    }

    > strong {
      font-size: 1.25rem;
    }
  }
`;
