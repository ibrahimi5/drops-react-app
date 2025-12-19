import './Navbar.css'
import { Link , useNavigate} from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

const Navbar = (loggedInUser) => {
    const { user, signOut } = useContext(UserContext)
    const navigate = useNavigate()
    
    //Functions
    const handleSignOut = ()=>{
        signOut()
        navigate('/')
    }
    return (

        <div id="navbar">
            <nav id="leftNavbar">
                <Link to='/'>Home</Link>
                {user ? (
                    <>
                        <Link to="/posts/new">Create a post</Link>
                    </>
                ) :(<></>)
                }
                <Link to='/categories'>Categories</Link>
            </nav>
            <nav id="rightNavbar">
                {user ? (
                    <>
                        <span className="user-name">{user.username}{user.profile_image}</span>
                        <Link to='/' onClick={handleSignOut}>Sign-out</Link>
                    </>
                ) : (
                    <>
                        <span className="user-name">Guest</span>
                        <Link to='sign-in'>Sign-in</Link>
                    </>
                )
                }
            </nav>
        </div>

    )
}
export default Navbar