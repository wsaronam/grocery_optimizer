import "./styles/ProductCard.css";




export default function ProductCard({ product, onAdd }) {
    return (
        <div className="product-card">
            <img className="product-card-img"
                src={product.image} 
                alt=""
            />

            <div className="product-card-info">
                <h2 className="product-card-name">{product.name}</h2>
                <p className="product-card-brand">{product.brand}</p>
                <button className="add-btn" onClick={() => onAdd(product)}>Add</button>
            </div>
            
        </div>
    )
}