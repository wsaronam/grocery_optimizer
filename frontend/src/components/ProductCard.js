export default function ProductCard({product}) {
    return (
        <div>
            {product.name} - {product.brand}
            <img src={product.image} alt="" width={50} />
        </div>
    )
}