import AddBooks from '../components/AddBooks';
import { db } from '../firebase/firebase.Config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useCollection } from './../hooks/useCollection';
import { useGlobalContext } from './../hooks/useGlobalContext';

function Home() {

  const { user } = useGlobalContext()
  const { documents } = useCollection('books', ['userID', '==', user.uid])

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'books', id))
  }

  return (
    <div className="mt-6">
      <AddBooks userId={user.uid} />
      {documents && (
        <>
          <ul className="flex justify-around flex-wrap gap-y-5 gap-x-1">
            {documents.map((doc) => {
              return <li key={doc.id} className="flex flex-col w-[350px] rounded bg-slate-300">
                <img className="w-full h-80 object-cover" src={doc.url} alt="" />
                <div className="p-4">
                  <h3 className="font-extrabold mb-2 capitalize">{doc.title}</h3>
                  <p className="text-sm">Author:
                    <em className="font-bold text-xs capitalize">{doc.author}</em>
                  </p>
                  <p className="text-sm">Pages: <span className="font-bold text-xs">{doc.page}</span></p>
                </div>
                <button onClick={() => handleDelete(doc.id)}>Delete</button>
              </li>
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default Home