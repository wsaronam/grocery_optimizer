import ProductCard from "./ProductCard";
import "./styles/ProductList.css";




export default function ProductList({ items, onAdd }) {
    return (
        <div className="product-list-container">
            {items.map(item => (
                <ProductCard key={item.barcode} product={item} onAdd={onAdd} />
            ))}
        </div>
    )
}