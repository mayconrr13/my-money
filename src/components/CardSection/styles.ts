import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  max-width: 1152px;

  padding: 0 1.5rem 1.5rem 1.5rem;
  margin: 3rem 0;

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  section {
    min-width: 300px;
    width: 80vw;
    max-width: calc(4 * 72px + 4.5rem);

    background-color: tomato;
    border-radius: 1rem;

    padding: 1rem;

    display: flex;
    flex-direction: column;

    position: relative;

    h2 {
      font-size: 1.25rem;
      color: var(--details);

      margin-bottom: 3rem;
    }

    strong {
      font-size: 2rem;
      color: var(--text);
      text-align: end;
    }

    img {
      width: auto;
      height: calc(100%);

      position: absolute;
      top: 0;
      right: 1rem;
    }

    & + section {
      margin-left: 1.5rem;
    }

    &:nth-child(1) {
      background-color: var(--green);
    }

    &:nth-child(2) {
      background-color: var(--red);

      img {
        transform: rotate(90deg);
      }
    }

    &:nth-child(3) {
      background-color: var(--gray);
    }
  }
`;
