import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./services/Firebase";

// Define a type for your Firestore documents
interface Item {
  id: string;
  [key: string]: any; // Add more specific fields as needed
}

function App() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "msg"));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];
        setData(documents);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Firestore Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="border p-2 my-2 rounded">
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
