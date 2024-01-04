import { useState, useEffect } from "react"
import { db } from '../firebase/firebase.Config'
import { collection, query, where, onSnapshot } from "firebase/firestore"

export function useCollection(col, _q) {

    const [documents, setDocuments] = useState(null)
    
    const q = query(collection(db, col), where(..._q))

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            const docs = []
            snapshot.docs.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(docs)
        })
    }, [col])

    return { documents }
}