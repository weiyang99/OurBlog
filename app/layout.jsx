import "@/styles/global.css";

import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

export const metadata = {
  title: 'Our Blog',
  description: 'An inclusive blog site where every wonderful person shares their story',
}

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
