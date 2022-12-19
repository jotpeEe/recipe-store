import '@styles/globals.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';

import { store } from '@redux';
import { queryClient } from '@requests';

const App = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);

export default App;
