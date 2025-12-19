import './App.css'
import { Routes, Route } from 'react-router'

// import Navbar from './components/Navbar/Navbar'

// * Page components
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
// import HootIndex from './components/HootIndex/HootIndex'
// import HootDetails from './components/HootDetails/HootDetails'
// import HootCreate from './components/HootCreate/HootCreate'
// import HootUpdate from './components/HootUpdate/HootUpdate'
// import NotFound from './components/NotFound/NotFound'

const App = () => {
  return (
    <>
        {/* <Navbar /> */}
        <main>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/hoots/:hootId" element={<HootDetails />} />
            <Route path="/hoots/new" element={<HootCreate />} />
            <Route path="/hoots/:hootId/edit" element={<HootUpdate />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
      </main>
    </>
  )
}

export default App
