//import React from 'react'

export default function Home() {
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            {userData.email}
        </div>
    )
}
