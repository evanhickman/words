import Head from 'next/head';
import Form from './components/Form';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Words</title>
        <meta name='description' content='An app for inspiration' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <header className='section'>
          <h1 className='font-black text-4xl text-center'>words</h1>
          <p className='text-center'>tangle us in our desires</p>
        </header>
        <Form></Form>
      </main>
    </div>
  );
}
