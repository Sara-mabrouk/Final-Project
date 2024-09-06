import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function Orders() {

    const { userToken } = useContext(UserContext);
    const { id } = jwtDecode(userToken);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // async function getAllOrders() {
    //     try {
    //         const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
    //             .then(() => {
    //                 console.log(data);

    //                 setOrders(response.data);
    //             });

    //     } catch (err) {
    //         setError("Failed to fetch orders.");

    //     }
    // }

    // useEffect(() => {
    //     getAllOrders();
    // }, []);



    useEffect(() => {
        async function getAllOrders() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        setOrders(response.data);
                    });
            } catch (error) {
                setError('Error fetching orders:', error);
            }
        }

        getAllOrders();
    }, []);




    return (
        <>
            <title>Orders</title>
            <meta name="description" content="Your all orders products" />



            {orders &&
            <>
            <h2 className="text-center m-4">
                    Hi, <span className="text-main fw-bold">{orders?.user?.name}</span>
                    <br />
                    Your orders are preparing to be shipped{" "}
                    <i className="fa-regular fa-circle-check fs-3 text-main"></i>
                </h2>
                <div className="container my-5 py-4 bg-main-light">
                        <h6 className="fw-bold  text-[#987070]">
                            Total Price : <span className=" text-[#987070]">{orders?.totalOrderPrice}</span> EGP
                        </h6>
                        <h6 className="fw-bold">
                            Total Cart Items : <span className="text-main">{orders?.cartItems?.length}</span> Products
                        </h6>
                    
                    </div>
                    </>
}
        </>
            )
}




