import React, { useState, useEffect } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../auth/auth'

const Follow = (prop) => {

    const { user, arr, setFollowStatus, followStatus } = useAuth();
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("");
    // const [followStatus, setFollowStatus] = useState();

    const filterdUser = users.filter(user => {
        return user.username.toLowerCase().includes(search.toLowerCase())
    });

    const toggleFollow = async (id) => {
        const currentStatus = followStatus[id];
        const newStatus = !currentStatus;

        setFollowStatus(prevStatus => ({
            ...prevStatus,
            [id]: newStatus
        }));

        let updatedFollowing;
        if (newStatus) {
            updatedFollowing = [...user.following, id];
        } else {
            updatedFollowing = user.following.filter(followId => followId !== id);
        }
        

        const URL = `http://localhost:5000/api/auth/followstatus/${user._id}`
        try {
            const response = await fetch(URL, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    'following': updatedFollowing,
                })
            });

            const res_data = await response.json();

            if (response.ok) {
                user.following = updatedFollowing;
            } else {
                alert(res_data.msg);
            }

        } catch (error) {
            console.log("Post updating error", error)
        }
    };

    const isFollowing = async (id) => {
        return await user.following.includes(id);
    }

    useEffect(() => {
        const fetchFollowStatus = async () => {
            const status = {};
            for (const item of filterdUser) {
                if (item._id !== prop.curr._id) {
                    status[item._id] = await isFollowing(item._id);
                }
            }
            setFollowStatus(status);
        };
        fetchFollowStatus();
    }, [prop.curr._id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/alluser');
                if (!response.ok) {
                    console.log('Failed to fetch data');
                }
                const jsonData = await response.json();
                setUsers(jsonData);
            } catch (error) {
                console.log("Error fetching")
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="fixed">

                <form className="flex items-center mx-auto md:w-80">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                            <svg className="w-4 h-4 stroke-cyan-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>

                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 rounded-full border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search" required value={search} onChange={(e) => setSearch(e.target.value)}

                        />

                    </div>

                </form>

                <div className='ms-5'>
                    {
                        filterdUser.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 mt-5">
                                {
                                    item._id != prop.curr._id &&
                                    <div className='flex'>
                                        <UserCircleIcon height={45} color='#3276A2' />
                                        <div className="font-medium">
                                            <div className='flex gap-10'>
                                                <div>{item.username}</div>

                                                <button
                                                    className="bg-sky-700 text-white px-4 py-1 mr-0 mx-auto rounded-full hover:bg-blue-600 transition-colors"
                                                    onClick={() => toggleFollow(item._id)}
                                                >
                                                    {
                                                        followStatus[item._id] ?
                                                            <div>Following</div> : <div>Follow</div>
                                                    }
                                                </button>
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 butt -mt-3">@{item.username}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Follow