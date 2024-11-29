import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingPage from './LoadingPage'

const Layout = ({ children }) => {
    const { isLoading, logout } = useAuth0();
    return (
        <div>
            {isLoading ? <LoadingPage /> : children}
            <footer className="flex justify-center bottom-0">
                <div className='flex flex-col gap-2 content-center'>
                    <p>Copyright &copy; Nicholas Gitman {new Date().getFullYear()}</p>
                    <div className="flex gap-5 ">
                        <button className="hover:text-indigo-700">GitHub</button>
                        <button className="hover:text-indigo-700" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout