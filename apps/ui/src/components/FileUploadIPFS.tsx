import { useState } from 'react';
import axios from 'axios';
const VITE_PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const JWT = `Bearer ${VITE_PINATA_JWT}`;

const FileUploadIPFS = ({ setIpfsHashes, style }) => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data);
      setIpfsHashes((prev) => [res.data.IpfsHash, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <label className="form-label">Choose File</label> */}
      <div className={style.file}>
        <input
          type="file"
          className={style.fileSelect}
          onChange={changeHandler}
        />
        <button className={style.button} onClick={handleSubmission}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FileUploadIPFS;
