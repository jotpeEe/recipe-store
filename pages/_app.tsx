import '@styles/globals.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';

import { PageLayout } from '@layouts';
import { store } from '@redux';
import { queryClient } from '@requests';

const App = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
                <PageLayout enableAuth={pageProps.enableAuth}>
                    <Component {...pageProps} />
                </PageLayout>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
    </QueryClientProvider>
);

export default App;
