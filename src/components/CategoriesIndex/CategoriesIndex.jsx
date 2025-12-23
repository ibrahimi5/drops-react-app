import "./CategoriesIndex.css"
import { useState, useEffect , useContext} from 'react'
import { categoryIndex } from '../../services/categories'
import { Link } from 'react-router'
import { UserContext } from "../../contexts/UserContext"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const CategoriesIndex = () => {
  const [categories, setCategories] = useState([])
  const [errorData, setErrorData] = useState({})
  
  dayjs.extend(relativeTime);


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await categoryIndex()
        setCategories(data)
      } catch (error) {
        console.log(error)
        setErrorData(error.response.data)
      }
    }
    getData()
  }, [])


  return (
    <>
      <h1>Categories</h1>
      { errorData.message
        ? <p className='error-message'>{errorData.message}</p>
          : <ul id="category-list">
            {categories.map(category => {
                return(
                  <p key={category.id} ><Link to={`/categories/${category.id}/posts`}>{category.name}</Link></p>
            )
          })}
           </ul>
      }
    </>
  )
}

export default CategoriesIndex