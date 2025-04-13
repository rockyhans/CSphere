import React, { useEffect, useState } from 'react';

const FileManagement = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null); // Track the file being edited

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const response = await fetch('http://localhost:5000/api/files', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        "Authorization": `Bearer ${token}`,

      },
    });

    const data = await response.json();
    if (response.ok) {
      setFiles(data);
    } else {
      alert(data.error);
    }
  };

  const handleFileCreation = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ name, content }),
    });

    if (response.ok) {
      setName('');
      setContent('');
      fetchFiles();
    } else {
      const data = await response.json();
      alert(data.error);
    }
  };

  // Delete file
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (response.ok) {
      alert('File deleted successfully');
      fetchFiles(); // Refresh the file list after deletion
    } else {
      alert('Error deleting file');
    }
  };

  // Save modified content
  const handleSave = async (id) => {
    const response = await fetch(`http://localhost:5000/api/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      alert('File updated successfully');
      setEditingFile(null); // Clear editing state
      fetchFiles(); // Refresh the file list
    } else {
      alert('Error updating file');
    }
  };

  // Set the file being edited
  const startEditing = (file) => {
    setEditingFile(file);
    setContent(file.content);
  };

  return (
    <div className="filesBar">
   
      <div>
      <form onSubmit={handleFileCreation} className='files'>
        <input
          type="text"
          placeholder="File Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="File Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create File</button>
      </form>
      </div>
      <h2>Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <h3>{file.name}</h3>
            <textarea
            defaultValue={file.content}
            disabled
            className='tetxA'
            />
            {/* <pre>{file.content}</pre> */}
            <div className='butn'>
            <button onClick={() => startEditing(file)}>Edit</button>
            <button onClick={() => handleDelete(file._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingFile && (
        <div className='files'>
          <h2>Edit {editingFile.name} File :</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button onClick={() => handleSave(editingFile._id)}>Save Changes</button>
          <button onClick={() => setEditingFile(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FileManagement;
