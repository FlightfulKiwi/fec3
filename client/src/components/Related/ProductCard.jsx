import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarsTile from '/client/src/components/RatingsComponents/ReviewsList/StarsTile.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import PriceLine from './PriceLine.jsx';

const ProductCard = (props) => {
  const item = props.product;
  const [defaultStyle, setDefaultStyle] = useState({});
  const [starAverage, setStarAverage] = useState(0);
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openComparisonModal = () => {
    setShowModal(true);
  };
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      props.setShowModal(false);
    }
  };
  useEffect(() => {
    axios.get(`/products/${item.id}/styles`)
      .then(res => {
        let styles = res.data.results;
        const [style] = styles.filter(style => style['default?'] === true);
        setDefaultStyle(style);
      })
      .then(() => {
        axios.get(`/reviews/meta?product_id=${item.id}`)
          .then(res => {
            const ratings = res.data.ratings;
            let [score, reviews] = [0, 0];
            for (const key in ratings) {
              reviews += parseInt(ratings[key]); //adds review count to denominator
              score += parseInt(ratings[key]) * parseInt(key); //adds score to numerator
            }
            const value = Math.round(score / reviews * 100) / 100; //rounds to two places
            setStarAverage(value);
          });
      })
      .then(() => {
        axios.get(`/products/${item.id}`)
          .then(res => setFeatures(res.data.features));
      });
  }, []);



  // console.log('card', setShowModal);

  return (
    <div className='product-card' >
      <div className='card-frame'>
        <img
          className='related-img'
          src = {defaultStyle.photos?.[0].thumbnail_url || 'https://png.vector.me/files/images/1/5/151985/none_icon_available_no_unavailable_preview.jpg'}
          alt = {`Product image for ${item.name} in default style`}
          onClick = {(e) => props.relatedClickHandler(e, item.id, item.name, props.setProductId)}
        />
      </div>
      <div className='card-details'>
        <span className='card-category'>{item.category}</span><br></br>
        <span
          className='card-name'
          // a href='#'
          onClick = {(e) => props.relatedClickHandler(e, item.id, item.name, props.setProductId)}
        >
          {item.name}
        </span><br></br>
        <PriceLine
          originalPrice = {defaultStyle.original_price}
          salePrice={defaultStyle.sale_price}
        /><br></br>
        <StarsTile stars ={starAverage} />
      </div>
      <button onClick={openComparisonModal}>show comparison window</button>
      {showModal ? <ComparisonModal setShowModal={setShowModal} mainFeatures = {props.mainFeatures} comparisonFeatures = {features} closeModal = {closeModal}/> : null}
    </div>);
};

export default ProductCard;