import { useState, useEffect } from "react";
import axios from "axios";

export function DetailsCard({
    token, 
    inMyListing, 
    address, 
    previewImage, 
    squareFootage, 
    bathrooms, 
    bedrooms, 
    propertyType, 
    hoa, 
    garage, 
    price, 
    listingId, 
    halfBathrooms }) {

    const [addListing, setAddListing] = useState([])
    const [preferences, setPreferences] = useState({
        bathrooms : 0,
        bedrooms : 0,
        garage : false ,
        hoa : false,
        yard : false})

    useEffect(() => {
        axios.get('https://homepare-backend.onrender.com/user-preference',{
            headers: {
              authorization: `x-access-token ${token}`
            }
          }).then((res) => {
            setPreferences(res.data)
            console.log(res.data)
     })}, [token])
    
    
    const handleAddListingClick = () => {
        console.log("add listing button")
        setAddListing()
        // post listing to db
        axios.post('https://homepare-backend.onrender.com/homes', {
            address: address,
            price: price,
            property_type: propertyType,
            bedrooms: bedrooms,
            half_bath: halfBathrooms,
            full_bath: bathrooms,
            living_area: squareFootage, 
            garage: garage,
            hoa: hoa,
            images: previewImage,
            _id: ""
        }, {
            headers: {
                authorization: `x-access-token ${token}`
            }
        })
    }

    const handleSaveNotes = () => {
        // post notes to API
    }

    const imgWidth = "200px";

    console.log('here in details card')
    
        return (
            <div className="detailsCard">
            <h1>Listing Details</h1>
            
            <img src={previewImage} alt="thumbnail of home" width={imgWidth}/>
            
            <p>Street Address:{address}</p>
            <p>$$$: {price} </p>
            <p>SQ Footage: {squareFootage}</p>
            <p>Bedrooms: {`${bedrooms} ${getCompareIcon(bedrooms, preferences.bedrooms)}`
            } </p>
            <p>Bathrooms: {getCompareIcon(bathrooms, preferences.bathrooms)}</p>
            <p>Half Bathrooms: {halfBathrooms}</p>
            <p>Property Type: {propertyType}</p>
            <p>HOA: {getCompareIcon(hoa, preferences.hoa)}</p>
            <p>Garage: {getCompareIcon(garage, preferences.garage)}</p>
            {inMyListing ? 
            <>
            <label>
                Comments/Notes:
                <textarea name="comments" rows={8} cols={40} />
                <button onClick={handleSaveNotes}>Save</button>
            </label>
            <AddToCollection token={token} />
            </>
            :
            <button onClick={handleAddListingClick}>
                Add to My Listings</button>
            }
            </div>
        )
    }


const getCompareIcon = (a,b) => {
    if(a === b) return "✅";
    else return "❌";
}

export function AddToCollection( {token} ) {
    const [myCollections, setMyCollections] = useState([])
    const [selectedCollection, setSelectedCollection]= useState('')

    useEffect(() => {
    axios.get('https://homepare-backend.onrender.com/collections',
    {
        headers: {
            authorization: `x-access-token ${token}`
        }
    }).then((res) => {
        setMyCollections(res.data.search)
        console.log(`collections data ${res.data.search}`)
        console.log(myCollections)
    })
}, [ myCollections, token ])
    
    return (
        <>
                <label >
                <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}>
                <option>Add To Collection</option>
                {myCollections.map((collection) => (
                <option key={collection._id} value={collection.search_name}>{collection.search_name}</option>
                ))}
                </select>
                </label>

       
        </>
    )
 }