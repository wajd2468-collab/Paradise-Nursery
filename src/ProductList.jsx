import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const img = (n) => `https://picsum.photos/seed/${n}/200/200`;

const plantsArray = [
  { category: 'Air Purifying Plants', plants: [
    { name: 'Snake Plant', image: img('snake'), description: 'Produces oxygen at night.', cost: '$15' },
    { name: 'Spider Plant', image: img('spider'), description: 'Filters formaldehyde and xylene.', cost: '$12' },
    { name: 'Peace Lily', image: img('lily'), description: 'Removes mold spores.', cost: '$18' },
    { name: 'Boston Fern', image: img('fern'), description: 'Adds humidity to the air.', cost: '$20' },
    { name: 'Rubber Plant', image: img('rubber'), description: 'Easy to care for.', cost: '$17' },
    { name: 'Aloe Vera', image: img('aloe'), description: 'Purifies air and heals skin.', cost: '$14' },
  ]},
  { category: 'Aromatic Plants', plants: [
    { name: 'Lavender', image: img('lavender'), description: 'Calming scent.', cost: '$20' },
    { name: 'Jasmine', image: img('jasmine'), description: 'Sweet floral fragrance.', cost: '$18' },
    { name: 'Rosemary', image: img('rosemary'), description: 'Fresh herbal aroma.', cost: '$15' },
    { name: 'Mint', image: img('mint'), description: 'Refreshing smell.', cost: '$12' },
    { name: 'Lemon Balm', image: img('lemonbalm'), description: 'Citrus scent.', cost: '$14' },
    { name: 'Basil', image: img('basil'), description: 'Aromatic kitchen herb.', cost: '$10' },
  ]},
  { category: 'Succulents', plants: [
    { name: 'Jade Plant', image: img('jade'), description: 'Symbol of good luck.', cost: '$16' },
    { name: 'Echeveria', image: img('echeveria'), description: 'Rosette-shaped leaves.', cost: '$13' },
    { name: 'Haworthia', image: img('haworthia'), description: 'Small and low maintenance.', cost: '$12' },
    { name: 'Cactus', image: img('cactus'), description: 'Needs very little water.', cost: '$10' },
    { name: 'String of Pearls', image: img('pearls'), description: 'Trailing bead-like leaves.', cost: '$19' },
    { name: 'Zebra Plant', image: img('zebra'), description: 'Striped decorative leaves.', cost: '$15' },
  ]},
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [added, setAdded] = useState({});

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAdded((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: 15, background: '#2e7d32', color: '#fff' }}>
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="#" style={{ color: '#fff' }} onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" style={{ color: '#fff' }} onClick={(e) => { e.preventDefault(); setShowCart(true); }}>🛒 Cart ({totalCount})</a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: 20 }}>
          {plantsArray.map((cat) => (
            <div key={cat.category}>
              <h2>{cat.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {cat.plants.map((p) => (
                  <div key={p.name} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, width: 200 }}>
                    <img src={p.image} alt={p.name} width="100%" />
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <p><b>{p.cost}</b></p>
                    <button disabled={added[p.name]} onClick={() => handleAdd(p)}>
                      {added[p.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
