import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalPost = (prop) => {

  const {arr,last, setLast } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [text, setText] = useState(prop.item.post);

  useEffect(() => {
    setText(prop.item.post);
  }, [prop.item.post]);

  const handlePostChange = (e) => {
    setText(e.target.value);
  }

  const handlePostUpdate = async (e) => {
    e.preventDefault();

    const URL = `http://localhost:5000/api/auth/post/${prop.item._id}`
    setLast(last + 1)

    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          'post': text,

        })
      });

      const res_data = await response.json();

      if (response.ok) {
        handleClose()

      } else {
        alert(res_data.msg);
      }

    } catch (error) {
      console.log("Post updating error", error)
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex mb-10'>
            <Typography id="modal-modal-title" className='items-center' variant="h6" component="h2">
              Edit
            </Typography>
            <button className='mr-0 mx-auto' onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>


          <textarea
            className="w-full h-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's happening?"
            value={text}
            onChange={handlePostChange}
            maxLength={400}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              className="bg-sky-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              onClick={handlePostUpdate}
            >
              Done
            </button>

          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalPost