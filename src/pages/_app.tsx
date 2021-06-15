import type { AppProps } from 'next/app';
import { TransactionProvider } from '../hooks/useTransaction';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </TransactionProvider>
  );
}
export default MyApp;
