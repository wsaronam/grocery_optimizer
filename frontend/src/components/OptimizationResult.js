import "./styles/OptimizationResult.css";




function OptimizationResult({result}) {
    if (!result) return null;

    const {cheapestStore, stores} = result;


    return (
        <div className="optimization-card">
            <h3>Best Store</h3>
            <div className="best-store">
                <span className="store-name">{cheapestStore.toUpperCase()}</span>
                <span className="store-price">${stores[cheapestStore].total.toFixed(2)}</span>
            </div>

            <h4>Store Comparisons</h4>
            <ul className="store-list">
                {Object.entries(stores).map(([store, data]) => (
                    <li key={store} className={store === cheapestStore ? "store-item best" : "store-item"}>
                        <span>{store}</span>
                        <span>${data.total.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default OptimizationResult;