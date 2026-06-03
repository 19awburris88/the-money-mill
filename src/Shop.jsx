const products = [
  {
    name: "Pokémon Sealed Products",
    category: "Pokémon",
    price: "Shop Collection",
    description: "Booster boxes, ETBs, Japanese sets, and premium collector products.",
  },
  {
    name: "One Piece TCG",
    category: "One Piece",
    price: "Shop Collection",
    description: "Starter decks, booster boxes, chase cards, and sealed releases.",
  },
  {
    name: "Dragon Ball Super",
    category: "Dragon Ball",
    price: "Shop Collection",
    description: "Collector-focused cards, competitive products, and premium artwork.",
  },
  {
    name: "Sports Cards",
    category: "Sports",
    price: "Shop Collection",
    description: "Basketball, football, baseball, rookies, slabs, and hobby boxes.",
  },
  {
    name: "Singles",
    category: "Cards",
    price: "Browse Singles",
    description: "Handpicked cards for collectors looking to complete their collection.",
  },
  {
    name: "Preorders",
    category: "Upcoming",
    price: "Reserve Now",
    description: "Secure upcoming releases before they sell out.",
  },
];

function Shop() {
  return (
    <section className="shop-page">
      <div className="shop-hero">
        <p className="eyebrow">The Money Mill Shop</p>
        <h1>Shop trading cards, sealed products, and collector favorites.</h1>
        <p>
          Browse Pokémon, One Piece, Dragon Ball, sports cards, singles,
          preorders, and collector-focused products from The Money Mill.
        </p>
      </div>

      <div className="shop-toolbar">
        <button>All</button>
        <button>Pokémon</button>
        <button>One Piece</button>
        <button>Dragon Ball</button>
        <button>Sports</button>
        <button>Singles</button>
      </div>

      <div className="shop-grid">
        {products.map((product) => (
          <div className="product-card" key={product.name}>
            <div className="product-image">
              <span>{product.category}</span>
            </div>

            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="product-bottom">
                <strong>{product.price}</strong>
                <a
                  href="https://www.uvtofficial.com/s/shop"
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shop;