import {useState} from 'react';
import api from '../../services/api.js';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setMessage("Kies eerst een afbeelding om te uploaden.");
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        setMessage('');
        try {
            let response;
            if (type === 'profile') {
                response = await api.post('/api/uploads/profile', formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });
            } else if (type === 'advert') {
                response = await api.post(`/api/uploads/advert/${id}`, formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });
            } else {
                throw new Error('Invalid upload type');
            }

            setMessage('Image uploaded successfully!');
            if (onUploadSuccess) {
                onUploadSuccess(response.data);
            }
        } catch (error) {
            setMessage('Failed to upload image. Please try again.');
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };



return (
    <div className="image-upload-container">
        <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            disabled={loading}
        />
        <button onClick={handleFileUpload} disabled={!selectedFile || loading}>
            {loading ? 'Uploading...' : 'Upload Image'}
        </button>
        {message && <p className="upload-message">{message}</p>}
    </div>
);
}

export default ImageUpload;