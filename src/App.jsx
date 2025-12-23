import './App.css'
import { Routes, Route } from 'react-router'

import Navbar from './components/Navbar/Navbar'

// * Page components
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import CategoriesIndex from './components/CategoriesIndex/CategoriesIndex'
import PostsByCategories from './components/PostsByCategories/PostsByCategories'
import PostShow from './components/PostShow/PostShow'
import PostCreate from './components/PostCreate/PostCreate'
// import HootUpdate from './components/HootUpdate/HootUpdate'
// import NotFound from './components/NotFound/NotFound'

const App = () => {
  return (
    <>
        <Navbar />
        <main>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesIndex />} />
            <Route path="/categories/:categoryId/posts" element={<PostsByCategories />} />
            <Route path="/posts/:postId" element={<PostShow />} />
            <Route path="/posts/new" element={<PostCreate />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
      </main>
    </>
  )
}

export default App
