import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
`;

export const Header = styled.header`
  width: 100%;
  height: 5rem;

  > div {
    width: 100%;
    max-width: 1152px;
    height: 100%;

    margin: 0 auto;
    padding: 0 1.5rem;

    display: flex;
    align-items: center;

    button {
      margin-left: auto;

      border: none;
      background-color: transparent;

      span {
        display: none;
      }

      div {
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
        background-color: var(--yellow);

        background-image: url('/icons/add.svg');
        background-position: center;
        background-size: auto;
        background-repeat: no-repeat;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 3rem;
`;

interface ButtonProps {
  visibleSection: 'statistics' | 'transactions';
}

export const Button = styled.button<ButtonProps>`
  width: calc(100% - 3rem);
  max-width: 400px;
  height: 2rem;

  border-radius: 1rem;
  border: none;
  background-color: #646464;

  display: flex;
  align-items: center;

  margin-bottom: 2rem;

  position: relative;

  strong {
    width: 50%;
    height: 100%;

    line-height: 2rem;
    font-size: 0.75rem;
    color: var(--text);

    z-index: 2;
  }

  span {
    width: 50%;
    height: 100%;
    border-radius: 1rem;

    background-color: var(--yellow);

    position: absolute;
    top: 0;

    // change position
    transform: ${({ visibleSection }) =>
      visibleSection === 'transactions' ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.2s ease-in-out;
  }

  @media (min-width: 800px) {
    display: none;
  }
`;

export const AdditionalDetailsSection = styled.section`
  display: flex;
  justify-content: center;

  width: 100%;

  @media (min-width: 800px) {
    justify-content: space-between;
  }
`;
