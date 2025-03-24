import React, { useState, useCallback } from 'react';


const Home = () => {

    const [value, setValue] = useState('');
    const handleJoinRoom = useCallback(() => {
        window.location.href = `/room/${value}`
    }, [value]);

    return (
        <div>
            <input type='text' placeholder='enter room code'
                value={value} onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join</button>
        </div>
    )
}

export default Home