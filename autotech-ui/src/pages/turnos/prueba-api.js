import axios from "axios";
import { useState, useEffect } from "react"

const Home = () => {

    const [posts, setPosts] = useState([]);

    const apiEndPoint = 'https://api-rest-pp1.onrender.com/api/tecnicos/'
    useEffect(() => {
        const getPosts = async () => {
            const { data: res } = await axios.get(apiEndPoint)
            setPosts(res)
        }
        getPosts()
    }, [])

    return (<>
        <div>
            <h2>Hay {posts.length} técnicos en el taller</h2>
        </div>

    </>)
}

export default Home