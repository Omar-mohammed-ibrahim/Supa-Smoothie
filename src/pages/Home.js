import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

//components
import SmoothieCard from "../components/SmoothieCard"
const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() =>{
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
        .from ('smoothies')
        .select()

        if (error) {
          setFetchError('could not find smoothies')
          setSmoothies(null)
          console.error(error)
        }

        if (data) {
          setSmoothies(data)
          setFetchError(null)
        }
    }

    fetchSmoothies()
  }, [])




  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
            <div className=""></div>
          </div>
        </div>)}
    </div>
  )
}

export default Home