import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <section className="order-success">
      <div className="order-success-card">
        <div className="order-success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>
          Thank you for your purchase from The Money Mill. You'll receive a confirmation email
          with your order details and shipping information shortly.
        </p>
        <Link to="/shop" className="primary-btn">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;
