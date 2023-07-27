import "@styles/globals.css";
import NextTopLoader from 'nextjs-toploader';

import { Nav, UpArrow, Provider } from "@components";

export const metadata = {
  title: 'Our Blog',
  description: 'An inclusive blog site where every wonderful person shares their story',
}

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <NextTopLoader showSpinner={false} />
      <Provider>
        <main>
          <Nav />
          {children}
          <UpArrow />
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
