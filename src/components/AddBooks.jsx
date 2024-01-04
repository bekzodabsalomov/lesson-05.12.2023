import { useRef } from "react";
import { db } from "../firebase/firebase.Config";
import { collection, addDoc } from 'firebase/firestore';

function AddBooks({ userId }) {
    const title = useRef();
    const author = useRef();
    const page = useRef();
    const url = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            url: url.current.value,
            title: title.current.value,
            author: author.current.value,
            page: +page.current.value,
            userId,
        };

        addDoc(collection(db, 'books'), data);

        title.current.value = '';
        author.current.value = '';
        page.current.value = '';
        url.current.value = '';
    };

    return (
        <div className="w-full max-w-[300px] mx-auto my-7">
            <h2 className="text-2xl mb-7">Add Books</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-3">
                    <span>Img url:</span>
                    <input ref={url} type="text" className="bg-yellow-200 px-3 py-2 text-xs" placeholder="Book img URL" required />
                </label>
                <label className="flex flex-col gap-3">
                    <span>Title:</span>
                    <input ref={title} type="text" className="bg-yellow-200 px-3 py-2 text-xs" placeholder="Enter the book name" required />
                </label>
                <label className="flex flex-col gap-3">
                    <span>Author:</span>
                    <input ref={author} type="text" className="bg-yellow-200 text-xs px-3 py-2" placeholder="Enter the author" required />
                </label>
                <label className="flex flex-col gap-3">
                    <span>Pages:</span>
                    <input ref={page} type="number" className="bg-yellow-200 text-xs px-3 py-2" placeholder="Enter the number of pages" required />
                </label>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs mb-4">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddBooks;
