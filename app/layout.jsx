import "@styles/globals.css";

import { Nav, UpArrow, Provider } from "@components";

export const metadata = {
  title: 'Our Blog',
  description: 'An inclusive blog site where every wonderful person shares their story',
}

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
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
