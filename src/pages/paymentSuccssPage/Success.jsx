import { Link, useParams } from "react-router-dom";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = ({ user }) => {
  const params = useParams();

  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <h2>Payment Successful!</h2>
          <p>Your course subscription has been activated.</p>
          <p>Reference Id - {params.id}</p>
          <Link to={`/${user._id}/dashboard`}>Go to Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
