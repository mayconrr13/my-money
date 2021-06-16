import styled from 'styled-components';

interface ContainerProps {
  visibleSection: 'statistics' | 'transactions';
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 500px;
  padding: 0 1.5rem;

  display: ${({ visibleSection }) =>
    visibleSection === 'statistics' ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;

  > span {
    display: block;

    width: 80vw;
    max-width: 300px;
    min-width: 200px;
    height: 80vw;
    max-height: 300px;
    min-height: 200px;
    border-radius: 50%;

    background-color: tomato;
  }

  @media (min-width: 800px) {
    display: flex;
  }
`;

interface ButtonsGroupProps {
  selectedRange: number;
}

export const ButtonsGroup = styled.div<ButtonsGroupProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 2rem;

  button {
    border: none;
    background: transparent;

    font-size: 0.75rem;
    color: var(--text);
    font-weight: 400;

    &:nth-child(${({ selectedRange }) => selectedRange}) {
      color: var(--yellow);
      font-weight: 700;
    }
  }

  @media (min-width: 800px) {
    button {
      font-size: 1rem;
    }
  }
`;

export const Summary = styled.div`
  display: flex;
  align-items: center;

  margin-top: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding-left: 1rem;

    position: relative;

    &:before {
      position: absolute;
      content: '';
      width: 0.25rem;
      height: 100%;
      border-radius: 0.125rem;
      top: 0;
      left: 0;
    }

    &:first-child {
      &:before {
        background-color: var(--green);
      }
    }

    &:last-child {
      &:before {
        background-color: var(--red);
      }
    }

    & + div {
      margin-left: 3rem;
    }

    span {
      font-size: 0.75rem;
      color: var(--details);
    }

    strong {
      font-size: 1rem;
      color: var(--text);
    }
  }

  @media (min-width: 800px) {
    > div {
      span {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }

      strong {
        font-size: 1.25rem;
      }
    }
  }
`;
