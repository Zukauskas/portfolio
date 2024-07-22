import TerminalPortfolio from '@/components/terminal-portfolio';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Developer Portfolio Terminal</title>
        <meta name="description" content="A terminal-style developer portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TerminalPortfolio />
      </main>
    </div>
  );
};

export default Home;