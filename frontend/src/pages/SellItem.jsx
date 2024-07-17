import { useState } from 'react'

const SellItem = ({newListing}) => {
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState([])
  const [subject, setSubject] = useState('math')
  const [price, setPrice] = useState(0.00)
  const [image, setImage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await newListing(title, authors, subject, price, image)
      setTitle('')
      setAuthors([])
      setSubject('math')
      setPrice(0.00)
      setImage(null)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const base64Image = await convertToBase64(file)
      setImage(base64Image)
    }
  }
  
  return (
    <div className='main-container'>
      <form onSubmit={handleSubmit} className='sell-form'>
        <div>
          <h1>
            Create Listing
          </h1>
        </div>
        <div>
          <input type="text" 
          className='sell-input'
          name='title' 
          placeholder='textbook title' 
          value={title}
          onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
          <input type="text" 
          className='sell-input'
          name='author' 
          placeholder='author(s), seperate by comma'
          value={authors}
          onChange={event => setAuthors((event.target.value).split(','))}/>
        </div>
        <div className='price-container'>
          <p>$</p>
          <input type="price" 
          className='sell-input'
          placeholder='0.00' 
          step="0.01" 
          min="0"
          value={price}
          onChange={event => {
            const value = parseFloat(event.target.value)
            const isValid = !isNaN(value)
            setPrice(isValid ? value : 0.00)
          }}
          />
        </div>
        <div className='subject-container'>
          <p>subject: </p>
          <select name="subjects" 
          id="subjects" 
          onChange={event => setSubject(event.target.value)}
          >
            <option value="math">Math</option>
            <option value="physics">Physics</option>
            <option value="history">History</option>
            <option value="psychology">Psychology</option>
            <option value="biology">Biology</option>
            <option value="chemistry">Chemistry</option>
            <option value="computer-science">Computer Science</option>
            <option value="economics">Economics</option>
            <option value="engineering">Engineering</option>
            <option value="geography">Geography</option>
            <option value="literature">Literature</option>
            <option value="philosophy">Philosophy</option>
            <option value="sociology">Sociology</option>
            <option value="statistics">Statistics</option>
            <option value="political-science">Political Science</option>
          </select>
        </div>
        <div className='img-input-display'>
          <input type="file" 
          name="image" 
          accept=".jpeg, .png, .jpg .webp"
          onChange={handleImageChange}/>
          {image ? (
            <img src={image} alt="Uploaded preview" style={{ width: '100px', height: '100px' }}/>
          ) : (
            <p>Upload Image</p>
          )}
        </div>
        <div>
          <button className='listing-btn' type='submit'>Create Listing</button>
        </div>
      </form>
    </div>
  )
}

export default SellItem

const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })
}