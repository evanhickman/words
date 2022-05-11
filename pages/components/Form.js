import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { randomArrayItem } from '../../utilities/randomArrayItem';

const dbInstance = collection(db, 'words');

export default function Form() {
  const [input, setInput] = useState('');
  const [wordsArr, setWordsArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setLoading(true);
    getDocs(dbInstance).then((data) => {
      setWordsArr(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <section>
      <div className='container'>
        <div className='bg-lime-200 p-2 rounded-md relative'>
          <div className='bg-blur'></div>
          {loading && 'Loading...'}
          {/* {wordsArr !== [] && randomArrayItem(wordsArr)['words']} */}
          {/* {wordsArr.map((word) => {
            return (
              <div key={word.id}>
                <p>{word.words}</p>
              </div>
            );
          })} */}
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
            className='py-1 px-2 rounded-md text-slate-800 bg-lime-200 cursor-pointer transition hover:bg-orange-400 focus:bg-orange-400'
          />
        </form>
      </div>
    </section>
  );
}
