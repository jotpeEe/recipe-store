import '@styles/globals.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import store from '@redux/store';
import { queryClient } from '@requests/graphqlClient';

const App = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </QueryClientProvider>
);

export default App;
