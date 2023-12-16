import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

import '../Styles/card.css'
import { Store } from "react-notifications-component";
export default function Card(props) {
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  let options = props.options;
  // let priceOptions = Object.keys(options);
  let priceOptions = Object.keys(options).filter((option) => option !== "_id");
  // let foodItem = props.item;
  let dispatch = useDispatchCart();

  const handleAddToCart = async () => {

    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length !== 0) {
      if (food.size === size) {

        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        Store.addNotification({
          title: "Food updated in the Cart!",
          type: "default",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1000,
            onScreen: true
          }
        });
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        Store.addNotification({
          title: "Food Added to Cart!",
          type: "default",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1000,
            onScreen: true
          }
        });
        // console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    Store.addNotification({
      title: "Food Added to Cart!",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
    // setBtnEnable(true)
  }


  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size]);

  return (

    <>

      <div className="cards mb-3" style={{ "WebkitJustifyContent": "space-between" }}>
        <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "375px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "145px", objectFit: "fill" }} />
          <div className="card-body text-center">
            <h5 className="card-title ">{props.foodItem.name}</h5>
            <div className="container w-100 card-bodies">
              <select className="m-2 h-100 card-btn rounded p-1" onChange={(e) => setQty(e.target.value)} data-toggle="tooltip" data-placement="top" title="Quantity">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                  )
                })}
              </select>
              <select className="m-2 h-100 card-btn rounded p-1" ref={priceRef} onChange={(e) => setSize(e.target.value)} data-toggle="tooltip" data-placement="top" title="Size">
                {priceOptions.map((data) => {
                  return (<option key={data} value={data}>{data}</option>)
                })}
              </select>

              <div className="d-inline h-100 fs-5">
                ₹{finalPrice}/-
              </div>
              <hr></hr>
              <button className="card-btn justify-center ms-2 " onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
