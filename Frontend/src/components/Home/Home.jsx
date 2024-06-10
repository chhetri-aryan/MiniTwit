import { UserCircleIcon } from '@heroicons/react/24/outline';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import ModalPost from './ModalPost'
import DeletePost from './DeletePost';
import Follow from './Follow';
import Nav from '../Nav/Nav';


const Home = () => {

  const { user, arr, setArr, last, setLast } = useAuth();
  const [text, setText] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/post');
        if (!response.ok) {
          console.log('Failed to fetch data');
        }
        const jsonData = await response.json();
        setArr(jsonData);
      } catch (error) {
        console.log("Error fetching")
      }
    };
    fetchData();
  }, [arr]);



  const handlePostChange = (e) => {
    setText(e.target.value);
  }

  const navigate = useNavigate();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:5000/api/auth/post"
    // setLast(last + 2)

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          'userid': user._id,
          'username': user.username,
          'post': text,
        })
      });

      const res_data = await response.json();
      // console.log(res_data.msg)

      if (response.ok) {
        setText("");

      } else {
        alert(res_data.msg);
      }

    } catch (error) {
      console.log("Post creating", error)
      navigate('*');
    }

  }

  const filteredUser = arr.filter(item => (user.following && user.following.includes(item.userid)) || item.userid === user._id);

return (
  <>
    <div className='container mx-auto md:grid md:grid-cols-12'>
      {/* Sidebar */}
      <div className='top-0 md:col-span-3 sm:col-span-2'>
        <Nav />
      </div>

      {/* Main Content */}
      <div className='md:col-span-6'>
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow-md">
          <textarea
            className="w-full h-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's happening?"
            value={text}
            onChange={handlePostChange}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              className="bg-sky-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              onClick={handlePostSubmit}
              disabled={text.trim() === ""}
            >
              Post
            </button>
          </div>
        </div>

        {/* All posts */}
        <div className="max-w-2xl mx-auto mt-10 space-y-4">
          {filteredUser.length > 0 ?
            filteredUser.map((item, index) => (
              <div key={index} className="border rounded-lg shadow-md">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className='flex items-center gap-3'>
                    <UserCircleIcon height={45} color='#3276A2' />
                    <div className='flex flex-col'>
                      <p>{item.username}</p>
                      <p className="text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  {item.userid === user._id &&
                    <div className='flex gap-2'>
                      <ModalPost item={item} />
                      <DeletePost item={item} />
                    </div>
                  }
                </div>
                <div className="p-4">
                  <p>{item.post}</p>
                  <div className="mt-5 space-x-20">
                  <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-sky-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                      </button>

                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-green-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </button>

                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-red-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                      </button>

                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-sky-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>

                      </button>

                  </div>
                </div>
              </div>
            )) :
            <div className="p-4 border rounded-lg shadow-md">No Post Available, Please Follow other Users to see Post</div>
          }
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='container md:col-span-3 mt-10'>
        <Follow curr={user} />
      </div>
    </div>
  </>
);

}

export default Home