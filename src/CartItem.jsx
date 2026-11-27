import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const price = (cost) => parseFloat(cost.substring(1));

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  const itemTotal = (i) => price(i.cost) * i.quantity;
  const totalAmount = items.reduce((sum, i) => sum + itemTotal(i), 0);

  const handleDecrement = (i) => {
    if (i.quantity > 1) dispatch(updateQuantity({ name: i.name, quantity: i.quantity - 1 }));
    else dispatch(removeItem(i.name));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Total Cart Amount: ${totalAmount}</h2>
      {items.map((i) => (
        <div key={i.name} style={{ display: 'flex', gap: 20, alignItems: 'center', borderBottom: '1px solid #ddd', padding: 10 }}>
          <img src={i.image} alt={i.name} width="80" />
          <div>
            <h3>{i.name}</h3>
            <p>Unit price: {i.cost}</p>
            <div>
              <button onClick={() => handleDecrement(i)}>-</button>
              <span style={{ margin: '0 10px' }}>{i.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ name: i.name, quantity: i.quantity + 1 }))}>+</button>
            </div>
            <p>Subtotal: ${itemTotal(i)}</p>
            <button onClick={() => dispatch(removeItem(i.name))}>Delete</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button style={{ marginLeft: 10 }} onClick={() => alert('Coming Soon')}>Checkout</button>
      </div>
    </div>
  );
}
