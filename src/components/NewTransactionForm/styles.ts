import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 1.5rem;

  strong {
    font-size: 1.5rem;
    color: var(--text);
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;

    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text);
    transform: rotate(45deg);
  }
`;

interface FormProps {
  selectedTransactionType: 'income' | 'outcome';
}

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  width: 100%;
  padding: 0 1.5rem 1.5rem 1.5rem;

  input,
  select {
    margin-bottom: 1rem;
    padding: 1rem;

    background-color: transparent;
    border: none;
    outline: none;
    border: 1.5px solid var(--details);

    color: var(--text);
  }

  fieldset {
    border: none;
    display: flex;

    width: 100%;

    margin-bottom: 1rem;

    button {
      padding: 1rem;
      flex: 1;

      position: relative;

      cursor: pointer;

      border: 1.5px solid var(--details);
      color: var(--text);
      background-color: transparent;
      text-align: center;

      input[type='radio'] {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9999999;

        width: 100%;
        height: 100%;

        opacity: 0;
        cursor: pointer;
      }

      img {
        position: absolute;
        top: 0;
        right: 1rem;
      }

      & + button {
        margin-left: 1rem;
      }

      &:first-child {
        background-color: ${({ selectedTransactionType }) =>
          selectedTransactionType === 'income' && 'var(--green)'};
      }

      &:last-child {
        background-color: ${({ selectedTransactionType }) =>
          selectedTransactionType === 'outcome' && 'var(--red)'};

        img {
          transform: scaleY(-1);
        }
      }
    }
  }

  select {
    option {
      background-color: var(--background);
    }
  }

  > button {
    padding: 1rem;
    border: none;
    background-color: var(--yellow);
    color: var(--text);
    font-weight: 700;
  }
`;
