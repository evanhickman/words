import { useState, useEffect } from 'react';
import { app, db } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const dbInstance = collection(db, 'words');

export default function Form() {
  const [input, setInput] = useState('');
  const [wordsArr, setWordsArr] = useState([]);

  const saveWords = (e) => {
    e.preventDefault();

    addDoc(dbInstance, {
      words: input,
    }).then(() => {
      setInput('');
      getWords();
    });
  };

  const getWords = () => {
    getDocs(dbInstance).then((data) => {
      setWordsArr(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <section>
      <div className='container'>
        <div className='bg-lime-200 p-2 rounded-md'>
          {wordsArr.map((word) => {
            return (
              <div key={word.id}>
                <p>{word.words}</p>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={saveWords}
          className='flex justify-center mt-4 p-1 pl-2 border border-solid border-slate-200 rounded-md shadow-md transition focus-within:shadow-lg focus-within:border-orange-400 focus-within:shadow-orange-400'
        >
          <input
            placeholder='go ahead'
            maxLength='100'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            autoFocus
            className='flex-grow border-0 drop-shadow-none'
          />
          <input
            type='submit'
            value='say it'
            className='py-1 px-2 rounded-md text-white bg-slate-800 cursor-pointer transition hover:bg-orange-400 hover:text-slate-800 focus:bg-orange-400 focus:text-slate-800'
          />
        </form>
      </div>
    </section>
  );
}
