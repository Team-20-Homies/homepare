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
            images: previewImage
        }, {
            headers: {
                authorization: `x-access-token ${token}`
            }
        })
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExYjUzMjJmNzYzM2Q4MDZmNjFjMGYiLCJpYXQiOjE3MDU2Mjg0MjcsImV4cCI6MTcwNTcxNDgyN30._5Ql6FLu32qgTy_vs1mE0vyN_bUUppPmSdmshsDB4Bw
    // const handleSaveNotes = () => {
    //     // post notes to API
    //     // will this need homeID?
    //     axios.put('https://homepare-backend.onrender.com/homes/:65a9f61012ba3ffb96a22617', {
    //         notes: notesInput
    //     }, {
    //         headers: {
    //             authorization: "x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXI5IiwiaWF0IjoxNzA1NTk1NDY5LCJleHAiOjE3MDU2ODE4Njl9.S1kPErLtGajmty_NF5sOUEle56onmCjpZ9svk-K1eOc"
    //         }
    //     })
    // }

    const imgWidth = "200px";

    console.log('here in details card')
    
        return (
            <div className="detailsCard">
            <h1>Listing Details</h1>
            
            <img src={previewImage} alt="thumbnail of home" width={imgWidth}/>
            
            <p>Street Address:{address}</p>
            <p>$$$: {price} </p>
            <p>SQ Footage: {squareFootage}</p>
            <p>Bedrooms: {bedrooms} </p>
            <p>Bathrooms: {bathrooms}</p>
            <p>Half Bathrooms: {halfBathrooms}</p>
            <p>Property Type: {propertyType}</p>
            <p>HOA: {hoa}</p>
            <p>Garage: {garage}</p>
            {inMyListing && <label>
                Comments/Notes:
                <textarea name="comments" rows={8} cols={40} />
                <button onClick={handleSaveNotes}>Save</button>
            </label>}
            <button onClick={handleAddListingClick}>
                Add to My Listings</button>
            </div>
    
        )
    }
