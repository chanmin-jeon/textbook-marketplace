import Header from '../components/Header'

const Home = ({loggedUser, userSet}) => {
  return (
    <>
      <header>
        <Header user={loggedUser} setUser={userSet}/>
      </header>
      <div className="main-container">
        this is the main container for website
      </div>
    </>
  )
}

export default Home