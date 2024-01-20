import homeData from "./data/homes.json";
import { useState } from 'react'
import { Menu } from "./Menu";
import { ChartDetails } from "./chartDetails";
import { Modal } from "@mantine/core";
import axios from "axios";


// export function ListingDetails() {
//   console.log(homeData);

//   const index = []

//   // const [index, setIndex] = useState(0)

//   return (
//     <>
//       <h1>Listing Details</h1>
//       <DetailsCard
//         streetAddress={homeData.value[0].UnparsedAddress}
//         sqFootage={homeData.value[0].LivingArea}
//         listPrice={homeData.value[0].ListPrice}
//         city={homeData.value[0].City}
//         zipCode={homeData.value[0].PostalCode}
//         thumbnail={homeData.value[0].Media[0].Thumbnail}
//         bedrooms={homeData.value[0].BedroomsTotal}
//         bathrooms={homeData.value[0].BathroomsTotalInteger}
//         propertyType={homeData.value[0].PropertySubType}
//       />
//       <ChartDetails>
        
//       </ChartDetails>
//       <Menu />
      
//     </>
//   );
// }

export function ListingDetailsCard( {token, address, previewImage, squareFootage, bathrooms, bedrooms, propertyType, hoa, garage, price, listingId, halfBathrooms}) {

const imgWidth = "200px"
const [notesInput, setNotesInput] = useState("")

const handleSaveNotes = () => {
        // post notes to API
        // will this need homeID?
        axios.put('https://homepare-backend.onrender.com/homes/:65a9f61012ba3ffb96a22617', {
            notes: notesInput
        }, {
            headers: {
                authorization: `x-access-token ${token}`
            }
        })
    }

  return (
    <>
    <div key={listingId} className="detailsCard">
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
            <label>
                Comments/Notes:
                <textarea onChange={(e)=>setNotesInput(e.target.value)} name="comments" rows={8} cols={40} />
                <button onClick={handleSaveNotes}>Save</button>
            </label>
            <AddToCollection 
                token={token}
            />
    </div>
    </>
  )
}

export function AddToCollection( {token}) {
    const [myCollections, setMyCollections] = useState([])
    axios.get('https://homepare-backend.onrender.com/collections',
    {
        headers: {
            authorization: `x-access-token ${token}`
        }
    }).then((res) => {
        setMyCollections(res.data.search)
    } )

    return (
        <>
        {/* {myCollections.map((collection) => {
            return (
                <select>
                <option></option>
                </select>
            )
        )}} */}
        </>
    )
}