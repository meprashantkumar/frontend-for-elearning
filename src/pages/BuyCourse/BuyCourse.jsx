import React, { useEffect } from "react";
import "./BuyCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse1 } from "../../Actions/courseActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUser, fetchme } from "../../Actions/userActions";
import { server } from "../../Redux/store";

const BuyCourse = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourse1(params.id));
  }, [dispatch, params]);

  const { course1 } = useSelector((state) => state.courses);

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (user && course1 && user.subscriptions.includes(course1._id)) {
    return navigate("/courses");
  }

  const checkoutHandler = async () => {
    const token = await localStorage.getItem("token");

    const {
      data: { order },
    } = await axios.post(
      `${server}/checkout`,
      { id: course1._id },
      {
        headers: {
          token: token,
        },
        withCredentials: true,
      }
    );

    const options = {
      key: "rzp_test_q3yvCeg9soHkle",
      amount: order.price,
      currency: "INR",
      name: "E Learning",
      description: "Study With Us",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/verification/${course1._id}`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            },
            {
              headers: {
                token: token,
              },
              withCredentials: true,
            }
          );

          if (data.message) {
            await dispatch(fetchUser());
            await dispatch(fetchme());
            await toast.success(data.message);
            await navigate(`/payment-success/${razorpay_payment_id}`);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

      theme: {
        color: "#8a4baf",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <div className="buy-course">
      {course1 && (
        <>
          <div className="course-header">
            <img
              src={course1.poster.url}
              alt={course1.title}
              className="course-image"
            />
            <div className="course-info">
              <h2 className="course-title">{course1.title}</h2>
              <p className="course-instructor">
                Instructor: {course1.createdBy}
              </p>
              <p className="course-price">Price: ₹{course1.price}</p>
            </div>
          </div>
          <div className="purchase-form">
            <h3>Complete Your Purchase</h3>
            <button
              onClick={checkoutHandler}
              className="purchase-button"
              type="submit"
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyCourse;
