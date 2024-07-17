const TextbookDisplay = ({textbook}) => {
  return (
    <article className="textbook-article">
      <div className="article-img-container">
        <img src={textbook.imageFile} alt="text book image" />
      </div>
      <div className="article-info-container">
        <div>
          <h3>
            {textbook.title.charAt(0).toUpperCase() + textbook.title.slice(1)}
          </h3>
        </div>
        <div>
          <p>by: {textbook.authors.join(', ')}</p>
        </div>
        <div>
          <p>subject: {textbook.category}</p>
        </div>
        <div>
          <p>$ {textbook.price}</p>
        </div>
      </div>
      <div className="message-seller-btn-container">
          <button className="message-seller-btn">Message Seller</button>
      </div>
    </article>
  )
}

export default TextbookDisplay