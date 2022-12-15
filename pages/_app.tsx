import '@styles/globals.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@requests/graphqlClient';

const App = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
);

export default App;
