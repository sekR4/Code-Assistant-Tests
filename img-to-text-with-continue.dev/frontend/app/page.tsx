import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUploader from './components/FileUploader';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Image Upload</title>
        <meta name="description" content="Upload an image to get a description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Upload Your Image</h1>
        <FileUploader />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick draggable pauseOnHover />
      </main>
    </div>
  );
};

export default Home;
