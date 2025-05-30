import { useEffect, useState } from "react";
import { Word } from "../models/Word";
import { Administrator } from "../models/Administrator";

function AdministratorList() {
  const [words, setWords] = useState<Word[]>([]);
  const [admins, setAdmins] = useState<Administrator[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);
  const [wordIdToUpdate, setWordIdToUpdate] = useState<number | null>(null);
  const [wordToUpdate, setWordToUpdate] = useState<string | null>(null);
  const [wordDescriptionToUpdate, setWordDescriptionToUpdate] = useState<string | null>(null);

  // Fetch all words and administrators
  useEffect(() => {
    // Fetch words
    fetch("http://localhost:8080/word-admin?AdminId=-1")
      .then(res => res.json())
      .then(json => setWords(json.content || []));

    // Fetch available administrators
    fetch("http://localhost:8080/admin")
      .then(res => res.json())
      .then(json => setAdmins(json));
  }, []);

  // Handle assigning admin to word
  const assignAdmin = () => {
    if (!selectedAdmin || !wordToUpdate) return;
    const updatedAdmin = {
      id: wordIdToUpdate,
      word: wordToUpdate,
      description: wordDescriptionToUpdate,
      administrator: {"id": selectedAdmin}
    }

    fetch(`http://localhost:8080/word-admin/${wordIdToUpdate}`, {
      method: "PUT",
      body: JSON.stringify({ updatedAdmin }),
      headers: { "Content-Type": "application/json" }
    })
    .then(() => {
      // Refresh the list after update
      fetch("http://localhost:8080/word-admin?AdminId=-1")
        .then(res => res.json())
        .then(json => setWords(json.content || []));
    });
  };

  return (
    <>
      <h1>Word Administration</h1>
      <div>
        {words.map(item => (
          <div key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.word}</strong> - {item.description}
            <br />
            {item.administrator ? (
              `(Admin: ${item.administrator.name})`
            ) : (
              <>
                <select 
                  onChange={(e) => {
                    setSelectedAdmin(Number(e.target.value));
                    setWordIdToUpdate(item.id);
                    setWordDescriptionToUpdate(String(item.description))
                    setWordToUpdate(String(item.word))
                  }}
                >
                  <option value="">Select admin</option>
                  {admins.map(admin => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
                <button onClick={assignAdmin}>Assign</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AdministratorList;