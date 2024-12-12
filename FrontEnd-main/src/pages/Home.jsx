import React, {useEffect, useState} from 'react'
import {Container, Button} from '../components';
import { Link } from 'react-router-dom';

function Home() {
    {/*
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])*/}
  
        return (
            <div className="w-full py-8 m-0 text-center">
                
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <Link to="/emails/all">
                                <Button >
                                    Moonshot Q1
                                </Button>
                            </Link>

                            <Link to="/login">
                                <Button >
                                    Moonshot Q2
                                </Button>
                            </Link>
                        </div>
                    </div>
               
            </div>
        )
    
}

export default Home